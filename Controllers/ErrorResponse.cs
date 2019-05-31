namespace Pley.Controllers 
{
  public class ErrorResponse
  {
    public string Message { get; set; }

    public ErrorResponse(string m) {
      Message = m;
    }
  }
}