using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Data;
using WebApp_Desafio_BackEnd.Models;

namespace WebApp_Desafio_BackEnd.DataAccess
{
    public class DepartamentosDAL : BaseDAL
    {
        public IEnumerable<Departamento> ListarDepartamentos()
        {
            IList<Departamento> lstDepartamentos = new List<Departamento>();

            using (SQLiteConnection dbConnection = new SQLiteConnection(CONNECTION_STRING))
            {
                using (SQLiteCommand dbCommand = dbConnection.CreateCommand())
                {
                    dbCommand.CommandText = "SELECT * FROM departamentos";

                    dbConnection.Open();

                    using (SQLiteDataReader dataReader = dbCommand.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            var departamento = new Departamento();

                            if (!dataReader.IsDBNull(0))
                                departamento.ID = dataReader.GetInt32(0);
                            if (!dataReader.IsDBNull(1))
                                departamento.Descricao = dataReader.GetString(1);

                            lstDepartamentos.Add(departamento);
                        }
                    }

                    dbConnection.Close();
                }
            }

            return lstDepartamentos;
        }

        public Departamento ObterDepartamento(int idDepartamento)
        {
            var departamento = Departamento.Empty;

            using (SQLiteConnection dbConnection = new SQLiteConnection(CONNECTION_STRING))
            {
                using (SQLiteCommand dbCommand = dbConnection.CreateCommand())
                {
                    dbCommand.CommandText = "SELECT * FROM departamentos WHERE ID = @ID";
                    dbCommand.Parameters.AddWithValue("@ID", idDepartamento);

                    dbConnection.Open();

                    using (SQLiteDataReader dataReader = dbCommand.ExecuteReader())
                    {
                        if (dataReader.Read())
                        {
                            departamento = new Departamento
                            {
                                ID = dataReader.GetInt32(0),
                                Descricao = dataReader.GetString(1)
                            };
                        }
                    }

                    dbConnection.Close();
                }
            }

            return departamento;
        }

        public bool GravarDepartamento(int ID, string descricao)
        {
            int regsAfetados = -1;

            using (SQLiteConnection dbConnection = new SQLiteConnection(CONNECTION_STRING))
            {
                using (SQLiteCommand dbCommand = dbConnection.CreateCommand())
                {
                    if (ID == 0)
                    {
                        // Criar um novo departamento se ID for 0
                        dbCommand.CommandText =
                            "INSERT INTO departamentos (Descricao) " +
                            "VALUES (@Descricao)";
                    }
                    else
                    {
                        // Atualizar um departamento existente
                        dbCommand.CommandText =
                            "UPDATE departamentos " +
                            "SET Descricao = @Descricao " +
                            "WHERE ID = @ID";
                    }

                    dbCommand.Parameters.AddWithValue("@Descricao", descricao);
                    dbCommand.Parameters.AddWithValue("@ID", ID);

                    dbConnection.Open();
                    regsAfetados = dbCommand.ExecuteNonQuery();
                    dbConnection.Close();
                }
            }

            return (regsAfetados > 0);
        }

        public bool ExcluirDepartamento(int idDepartamento)
        {
            int regsAfetados = -1;

            using (SQLiteConnection dbConnection = new SQLiteConnection(CONNECTION_STRING))
            {
                using (SQLiteCommand dbCommand = dbConnection.CreateCommand())
                {
                    dbCommand.CommandText = "DELETE FROM departamentos WHERE ID = @ID";
                    dbCommand.Parameters.AddWithValue("@ID", idDepartamento);

                    dbConnection.Open();
                    regsAfetados = dbCommand.ExecuteNonQuery();
                    dbConnection.Close();
                }
            }

            return (regsAfetados > 0);
        }
    }
}