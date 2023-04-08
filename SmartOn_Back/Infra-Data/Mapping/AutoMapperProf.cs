using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Entitys;
using Domain.Model;

namespace Infra_Data.Mapping
{
    public class AutoMapperProf : Profile
    {
        public AutoMapperProf(){
            CreateMap<Departamento, DepartamentoModel>().ReverseMap();
            CreateMap<Funcionario, FuncionarioModel>().ReverseMap();
        }
        
    }
}