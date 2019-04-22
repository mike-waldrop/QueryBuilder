using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Landstar.Cloud.Models.Mulesoft.Transportation.Order;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QueryBuilder.Shared;

namespace QueryBuilder.Controllers
{
  [Route("api/querybuilder")]
  public class SampleDataController : ControllerBase
  {

    [HttpGet("GetModel")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<string>> GetModel()
    {
      var settings = new JsonSerializerSettings
      {
        ContractResolver = new LongNameContractResolver(),
        Formatting = Formatting.Indented,
        NullValueHandling = NullValueHandling.Ignore
      };

      var orderDetail = CreateObject.Create<OrderDetail>();
      var json = JsonConvert.SerializeObject(orderDetail, settings);
      return json;
    }


  }
}