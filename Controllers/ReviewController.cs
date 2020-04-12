using System;
using System.Text;
using System.Diagnostics;
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
using Honeycomb.AspNetCore;

namespace Pley.Controllers {
    
  [Authorize]
  [Route("api/reviews")]
  public class ReviewController : Controller {

    private IReviewService _svc;
    private IMapper _mapper;
    private ILogger _logger;
    private readonly IHoneycombEventManager _eventManager;

    public ReviewController(
      IReviewService svc,
      IMapper mapper,
      ILogger<ReviewController> logger,
      IHoneycombEventManager eventManager
    ) {
      _svc = svc;
      _mapper = mapper;
      _logger = logger;
      _eventManager = eventManager;
    }

    [HttpGet]
    public IActionResult GetAll() {
      var stopWatch = new Stopwatch();
      stopWatch.Start();
      try {
        var reviews = _mapper.Map<IList<ReviewDto>>(_svc.GetAll());
        return Ok(reviews);
      } catch (Exception ex) {
        return BadRequest(new ErrorResponse(ex.Message));
      } finally {
        stopWatch.Stop();
        _eventManager.AddData("api_response", stopWatch.ElapsedMilliseconds);
      }
    }

    [HttpGet]
    [Route("{id}")]
    public IActionResult Get([FromRoute]int id) {
      try {
        return Ok(_mapper.Map<ReviewDto>(_svc.Get(id)));
      } catch (PleyNotFoundException ex) {
        return NotFound(new ErrorResponse(ex.Message));
      } catch (Exception ex) {
        return BadRequest(new ErrorResponse(ex.Message));
      }
    }

    [HttpDelete]
    [Route("{id}")]
    [Authorize(Roles=Role.Admin)]
    public IActionResult Delete([FromRoute]int id) {
      try {
        _svc.Delete(id);
        return Ok();
      } catch (PleyNotFoundException ex) {
        return NotFound(new ErrorResponse(ex.Message));
      } catch (Exception ex) {
        return BadRequest(new ErrorResponse(ex.Message));
      }
    }

    [HttpPost]
    public IActionResult Create([FromBody]ReviewDto dto) {
      try {
        var review = _svc.Create(_mapper.Map<Review>(dto));
        return Ok(_mapper.Map<ReviewDto>(review));
      } catch (PleyNotFoundException ex) {
        return NotFound(new ErrorResponse(ex.Message));
      } catch (Exception ex) {
        return BadRequest(new ErrorResponse(ex.Message));
      }
    }
    [HttpPut]
    [Authorize(Roles=Role.Admin)]
    public IActionResult Update([FromBody]ReviewDto dto) {
      try {
        var review = _svc.Update(_mapper.Map<Review>(dto));
        return Ok(_mapper.Map<ReviewDto>(review));
      } catch (PleyNotFoundException ex) {
        return NotFound(new ErrorResponse(ex.Message));
      } catch (Exception ex) {
        return BadRequest(new ErrorResponse(ex.Message));
      }
    }

    [HttpPut]
    [Route("{id}/reply")]
    [Authorize(Roles=Role.Owner + "," + Role.Admin)]
    public IActionResult Reply([FromBody]ReviewDto dto) {
      try {
        var review = _svc.Reply(dto.Id, dto.OwnerReply);
        return Ok(_mapper.Map<ReviewDto>(review));
      } catch (PleyNotFoundException ex) {
        return NotFound(new ErrorResponse(ex.Message));
      } catch (Exception ex) {
        return BadRequest(new ErrorResponse(ex.Message));
      }
    }
  }
}