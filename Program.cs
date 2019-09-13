using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Datadog.Trace;

namespace Pley
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Tracer.Instance.Settings.AnalyticsEnabled = true;
            Tracer.Instance.Settings.TraceEnabled = true;
            Tracer.Instance.Settings.ServiceName = "ODM_Pley";
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .ConfigureLogging(logging =>
                {
                    logging.ClearProviders();
                    logging.AddConsole();
                });
    }
}
