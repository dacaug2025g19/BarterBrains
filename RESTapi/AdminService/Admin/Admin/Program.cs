using Admin.Models;
using Admin.Repositories;
using Admin.Repositories.Interfaces;
using Admin.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Steeltoe.Discovery.Client;
using System.Text;

namespace Admin
{
    public class Program
    {
        public static void Main(string[] args)

        {
            var builder = WebApplication.CreateBuilder(args);

            // Add Steeltoe Discovery Client
            builder.Services.AddDiscoveryClient(builder.Configuration);

           

            // ===============================
            // Add services to the container
            // ===============================

            builder.Services.AddControllers();

            // ---------- Swagger ----------
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "BarterBrains Admin Service",
                    Version = "v1"
                });

                // JWT support in Swagger
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Enter JWT token like: Bearer {token}"
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] {}
                    }
                });
            });

            // ---------- Database ----------
            builder.Services.AddDbContext<P19BarterbrainsContext>(options =>
            {
                options.UseMySql(
                    builder.Configuration.GetConnectionString("MySqlCon"),
                    ServerVersion.AutoDetect(
                        builder.Configuration.GetConnectionString("MySqlCon")
                    )
                );
            });

            // ---------- Repositories ----------
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<ISkillRepository, SkillRepository>();
            builder.Services.AddScoped<IDashboardRepository, DashboardRepository>();

            // ---------- Services ----------
            builder.Services.AddScoped<AdminUserService>();
            builder.Services.AddScoped<AdminSkillService>();
            builder.Services.AddScoped<AdminDashboardService>();

            var app = builder.Build();

            // ===============================
            // HTTP request pipeline
            // ===============================

            // Use Steeltoe Discovery Client
            app.UseDiscoveryClient();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //app.UseHttpsRedirection();

            //CORS implementation
            app.UseCors("AllowFrontend");


            app.UseAuthentication();   // 🔑 MUST be before Authorization
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
