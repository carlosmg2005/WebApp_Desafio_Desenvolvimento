using System.Collections.Generic;
using WebApp_Desafio_BackEnd.DataAccess;
using WebApp_Desafio_BackEnd.Models;

namespace WebApp_Desafio_BackEnd.Business
{
    public class DepartamentosBLL
    {
        private DepartamentosDAL dal = new DepartamentosDAL();

        /// <summary>
        /// Lista todos os departamentos.
        /// </summary>
        public IEnumerable<Departamento> ListarDepartamentos()
        {
            return dal.ListarDepartamentos();
        }

        /// <summary>
        /// Obtém um departamento específico por ID.
        /// </summary>
        public Departamento ObterDepartamento(int idDepartamento)
        {
            return dal.ObterDepartamento(idDepartamento);
        }

        /// <summary>
        /// Cria um novo departamento.
        /// </summary>
        public bool GravarDepartamento(int id, string descricao)
        {
            return dal.GravarDepartamento(id, descricao);
        }

        /// <summary>
        /// Exclui um departamento.
        /// </summary>
        public bool ExcluirDepartamento(int idDepartamento)
        {
            return dal.ExcluirDepartamento(idDepartamento);
        }
    }
}
