using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.Entitys;
using Microsoft.EntityFrameworkCore;

namespace Infra.Data.Context
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        public DbSet<Funcionario> Funcionario {get; set;}
        public DbSet<Departamento> Departamento {get; set;}
    }
}