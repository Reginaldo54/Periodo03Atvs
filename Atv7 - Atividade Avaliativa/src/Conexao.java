
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Conexao 
{

    private static final String USUARIO = "root";
    private static final String SENHA = "teste";
    private static final String URL = "jdbc:mysql://127.0.0.1:3306/aplicacao";
    private static final String DRIVER = "com.mysql.cj.jdbc.Driver";

    

// Conecta ao banco e retorna a conexão
    public static Connection abrir() throws Exception 
    {
        // Registra o driver
        Class.forName(DRIVER);
        // Abre a conexão
        
        Connection conn = DriverManager.getConnection(URL, USUARIO, SENHA);
        
        System.out.println("Conex�o Aberta com sucesso");
        
        return conn;
    }
    
    
    public static void CriarConta(Connection conn, String nome, float saldo)
    {
    	// Supondo que voc� j� tenha uma conex�o `conn` estabelecida
    	try
    	{
    	    String sql = "INSERT INTO Conta (nome, saldo) VALUES ('"+nome+"', '"+saldo+"')";
    	    System.out.println(sql);
    	    conn.createStatement().executeUpdate(sql);
    	    System.out.println("Inser��o realizada com sucesso!");
    	} catch (SQLException e) {
    	    e.printStackTrace();
    	}
    	
    	System.out.println("Inser��o Falhou!");
    	
    }
   

    public static void ConsultaConta(Connection conn, int id)
    {
    	// Supondo que voc� j� tenha uma conex�o `conn` estabelecida
    	try 
    	{
    	    String sql = "SELECT * FROM conta WHERE id = " + id;
    	    
            // Executa a consulta
            ResultSet resultSet = conn.createStatement().executeQuery(sql);

            // Processa os resultados
            resultSet.next();
            
            float saldo = resultSet.getFloat("saldo"); // Substitua 'id' pelo nome da coluna que voc� quer recuperar
            String nome = resultSet.getString("nome"); // Substitua 'nome' pelo nome da coluna que voc� quer recuperar

            System.out.println("ID: " + id + ", Nome: " + nome + ", Saldo: R$ " + saldo);
        
            System.out.println("Inser��o realizada com sucesso!");
    	} catch (SQLException e) {
    	    e.printStackTrace();
    	}
    	
    }
    
    public static void AlterandoValorConta(Connection conn, int id, String nome, float saldo)
    {
    	try 
    	{
    	    String sql = "UPDATE conta SET nome = '"+nome+"', saldo = "+saldo+" WHERE id = " + id ;
    	    conn.createStatement().executeUpdate(sql);
    	    System.out.println(sql);
    	    System.out.println("Atualiza��o realizada com sucesso!");
    	} catch (SQLException e) {
    	    e.printStackTrace();
    	}
    }
    
    public static void RemovendoConta(Connection conn, int id)
    {
    	try 
    	{
    	    String sql = "DELETE FROM conta WHERE id = " + id;
    	    conn.createStatement().executeUpdate(sql);
    	    System.out.println("Remo��o realizada com sucesso!");
    	} catch (SQLException e) {
    	    e.printStackTrace();
    	}

    }
    
    public static void ExibindoContas(Connection conn)
    {
    	System.out.println("Contas: ");
    	
    	try 
    	{
    	    String sql = "SELECT * FROM Conta;";
    	    
            // Executa a consulta
            ResultSet resultSet = conn.createStatement().executeQuery(sql);

            // Processa os resultados
            while (resultSet.next())
            {
            	int id = resultSet.getInt("id");
            	float saldo = resultSet.getFloat("saldo"); // Substitua 'id' pelo nome da coluna que voc� quer recuperar
                String nome = resultSet.getString("nome"); // Substitua 'nome' pelo nome da coluna que voc� quer recuperar

                System.out.println("ID: " + id + ", Nome: " + nome + ", Saldo: R$ " + saldo);
            }
    	    
    	} catch (SQLException e) {
    	    e.printStackTrace();
    	}

    }
        
    
    public static void fecharConexao(Connection conn) 
    {
        try
        {
            if (conn != null && !conn.isClosed()) {
                conn.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        System.out.println("Conex�o Fechada com sucesso");
    }

}


	














