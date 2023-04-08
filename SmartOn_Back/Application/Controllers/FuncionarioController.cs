using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using Domain.Entitys;
using Domain.Interfaces;
using Domain.Model;
using Microsoft.AspNetCore.Mvc;


namespace Application.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FuncionarioController : ControllerBase
    {
        public IBaseService<Funcionario> Service { get; }
        public IMapper Mapper { get; }
        public FuncionarioController(IBaseService<Funcionario> service, IMapper mapper )
        {
            this.Mapper = mapper;
            this.Service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get(){
            try {
                var entity = await this.Service.GetAll();
                var results = this.Mapper.Map<FuncionarioModel[]>(entity);
                return Ok(results);

            }
            catch(System.Exception ex){
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetById(string Id){
            var entity = await this.Service.GetById(Id);
            var results = this.Mapper.Map<FuncionarioModel>(entity);
            return Ok(results);
        }

        [HttpPost]
        public async Task<IActionResult> Post(FuncionarioModel funcionario){
            var people1 = this.Mapper.Map<Funcionario>(funcionario);

            this.Service.Add(people1);

            if(await this.Service.SaveChangesAsync())
                return Created($"api/Funcionario/{funcionario.Id}", funcionario);
            return BadRequest();
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete(string Id){
            var entity = await this.Service.GetById(Id);

            if(entity == null) return NotFound();
            this.Service.Delete(entity);

            if(await this.Service.SaveChangesAsync()) return Ok();
            return BadRequest();
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult>Put(string Id, FuncionarioModel model){
            var entity = await this.Service.GetById(Id);

            if(entity == null) return NotFound();
            
            this.Mapper.Map(model, entity);
            this.Service.Update(entity);

            if(await this.Service.SaveChangesAsync())
                return Created($"api/Funcionario/{model.Id}", this.Mapper.Map<FuncionarioModel>(entity));
            return BadRequest();
        }
    }
}