using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entitys
{
    public class Funcionario : EntityBase
    {
         public string CellPhone { get; set; } = "";
        public string Address{ get; set; } = "";
        public float Wage { get; set; }
        public string IdDepartament { get; set; } = "";
    }
}