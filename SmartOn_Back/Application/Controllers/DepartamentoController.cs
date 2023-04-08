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
   
    public class DepartamentoController : ControllerBase
    {
        public IBaseService<Departamento> Service { get; }
        public IMapper Mapper { get; }
        public DepartamentoController(IBaseService<Departamento> service, IMapper mapper )
        {
            this.Mapper = mapper;
            this.Service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get(){
            try {
                var entity = await this.Service.GetAll();
                var results = this.Mapper.Map<DepartamentoModel[]>(entity);
                return Ok(results);

            }
            catch(System.Exception ex){
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetById(string Id){
            var entity = await this.Service.GetById(Id);
            var results = this.Mapper.Map<DepartamentoModel>(entity);
            return Ok(results);
        }

        [HttpPost]
        public async Task<IActionResult> Post(DepartamentoModel departamento){
            var people1 = this.Mapper.Map<Departamento>(departamento);

            this.Service.Add(people1);

            if(await this.Service.SaveChangesAsync())
                return Created($"api/Departamento/{departamento.Id}", departamento);
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
        public async Task<IActionResult>Put(string Id, DepartamentoModel model){
            var entity = await this.Service.GetById(Id);

            if(entity == null) return NotFound();
            
            this.Mapper.Map(model, entity);
            this.Service.Update(entity);

            if(await this.Service.SaveChangesAsync())
                return Created($"api/Departamento/{model.Id}", this.Mapper.Map<DepartamentoModel>(entity));
            return BadRequest();
        }
    }
}