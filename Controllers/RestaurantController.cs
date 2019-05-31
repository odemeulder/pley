using System;
using System.Text;
using System.Linq;
using System.Collections.Generic;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using AutoMapper;
using Pley;
using Pley.Models;
using Pley.Dtos;
using Pley.Services;

namespace Pley.Controllers {
    
  [Authorize]
  [Route("api/restaurants")]
  public class RestaurantController : Controller {

    private IRestaurantService _svc;
    private IMapper _mapper;
    private ILogger _logger;

    public RestaurantController(IRestaurantService svc,
      IMapper mapper,
      ILogger<RestaurantController> logger
    ) {
      _svc = svc;
      _mapper = mapper;
      _logger = logger;
    }

    [HttpGet]
    public IActionResult GetAll() {
      try {
        var restaurants = _svc.GetAll();
        foreach (var r in restaurants) {
          _logger.LogDebug($"Debugging restaurants {r.RestaurantName}, owner {r.Owner?.Id}");
        }
        return Ok(_mapper.Map<IList<RestaurantDto>>(restaurants));
      } catch (Exception ex) {
        return BadRequest(new ErrorResponse(ex.Message));
      }
    }

    [HttpGet]
    [Route("{id}")]
    public IActionResult Get([FromRoute]int id) {
      try {
        var restaurant = _svc.Get(id);
        return Ok(_mapper.Map<RestaurantDto>(restaurant));
      } catch (PleyNotFoundException) {
        return NotFound(new ErrorResponse("Restaurant not found."));
      } catch (Exception ex) {
        return BadRequest(new ErrorResponse(ex.Message));
      }
    }

    [HttpPost]
    public IActionResult Create([FromBody]RestaurantDto dto) {
      try {
        var restaurant = _svc.Create(_mapper.Map<Restaurant>(dto));
        return Ok(_mapper.Map<RestaurantDto>(restaurant));
      } catch (Exception ex) {
        return BadRequest(new ErrorResponse(ex.Message));
      }
    }

    [HttpPut]
    public IActionResult Update([FromBody]RestaurantDto dto) {
      try {
        var restaurant = _svc.Update(_mapper.Map<Restaurant>(dto));
        return Ok(_mapper.Map<RestaurantDto>(restaurant));
      } catch (PleyNotFoundException) {
        return NotFound(new ErrorResponse("Restaurant not found."));
      } catch (Exception ex) {
        return BadRequest(new ErrorResponse(ex.Message));
      }
    }


    [HttpDelete]
    [Route("{id}")]
    public IActionResult Delete([FromRoute]int id) {
      try {
        _svc.Delete(id);
        return Ok();
      } catch (PleyNotFoundException) {
        return NotFound(new ErrorResponse("Cannot delete. Restaurant not found."));
      } catch (Exception ex) {
        return BadRequest(new ErrorResponse(ex.Message));
      }
    }
  }
}