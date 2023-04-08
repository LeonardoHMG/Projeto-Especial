using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class FuncionarioModel
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; } = "";
        public string CellPhone { get; set; } = "";
        public string Address{ get; set; } = "";
        public float Wage { get; set; }
         public string IdDepartament { get; set; } = "";
    }
}