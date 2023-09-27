import java.sql.Connection;
import java.util.Scanner;

public class Menu 
{
	Scanner entrada = new Scanner(System.in);
	private static Connection conn = null;
    
	private static String login = "App";
	private static String senha = "Senha123";
	
	public static void main(String[] args) throws Exception 
    {

        conn = Conexao.abrir();
        
		Scanner entrada = new Scanner(System.in);
		// Se instanciando
		Menu menu = new Menu();
		String inputLogin = " ";
		String inputSenha = " ";
		
		
		while(login.equals(inputLogin) == false || senha.equals(inputSenha) == false)
		{
			System.out.println("\nInsira o login: ");
			inputLogin = entrada.next();
			
			System.out.println("\nInsira a senha: ");
			inputSenha = entrada.next();
			

			System.out.println("Login inserido: " + inputLogin+ " \nSenha inserida: " +  inputSenha);
			if(login.equals(inputLogin)  == false || senha.equals(inputSenha) == false)
			{
				System.out.println("\nA senha ou login está incorreto. ");
			}
		}
		
		
		System.out.println("\nAcesso Concebido!\n");
		
		
        while (true) 
        {
            System.out.println("Sistema Bancário");
            System.out.println("Digite a sua opção:\n");
            System.out.println("1 - Cadastrar Conta");
            System.out.println("2 - Consultar Conta");
            System.out.println("3 - Alterar Conta");
            System.out.println("4 - Remover Conta");
            System.out.println("5 - Exibe todas as contas");
            System.out.println("9 - Sair do sistema");

            int opcao = entrada.nextInt();

            switch (opcao) 
            {
                case 1:
                    menu.CriandoConta();
                    break;
                case 2:
                    // Chame a classe de Consulta
                	menu.Consultando();
                    break;
                case 3:
                    // Chame a classe de Alteração
                	menu.AlterandoConta();
                    break;
                case 4:
                    // Chame a classe de Remoção
                	menu.RemovendoConta();
                    break;
                case 5:
                    // Chame a classe de Exibição
                	Conexao.ExibindoContas(conn);
                    break;
                case 9:
                    Conexao.fecharConexao(conn); // Fecha a conexão com o banco de dados
                    System.exit(0);
                    entrada.close();
                default:
                    System.out.println("Opção inválida. Tente novamente.");
                    break;
            }
        }
    }
    
    public void CriandoConta()
    {
    	// Consumir o caractere de nova linha
    	    
    	System.out.println("Insira o Seu nome:");
    	String nome = entrada.nextLine(); 
    	
    	System.out.println("Insira o saldo");
    	float saldo = entrada.nextFloat();
    	
    	Conexao.CriarConta(conn, nome, saldo);
    }
    
    // Consultando Depedendo de input de usuário
    public void Consultando()
    {
    	// Consultando valores... com base no id?
    	System.out.println("Insira o id da conta que vc quer consulta:");
    	int id = entrada.nextInt();
    	
    	Conexao.ConsultaConta(conn, id);
		
    	System.out.println("Conta Acessada:\n");
    }
    
    // Consultando que 
    public void Consultando(int id)
    {
    	
    	Conexao.ConsultaConta(conn, id);

    	System.out.println("Conta Acessada:\n");
    	
    }
    
    
    public void AlterandoConta()
    {
    	
    	System.out.println("Insira o id da conta que vc quer alterar:");
    	int id = entrada.nextInt();
    	
    	Consultando(id);
    	

    	entrada.nextLine(); // Consumir o caractere de nova linha
    	    
    	System.out.println("Insira o novo nome seu nome:");
    	
    	String nome = entrada.nextLine(); 
    	
    	System.out.println("Insira o saldo");
    	float saldo = entrada.nextFloat();
    	
    	
    	// Passar isso para a função de alteração de dados.
    	Conexao.AlterandoValorConta(conn, id, nome, saldo);
    	
    	System.out.println("Novos Valores:");
    	
    	Consultando(id);
    }
    
    
    
    
    public void RemovendoConta()
    {
    	Conexao.ExibindoContas(conn);
    	// Dando a opção de excluir a conta com base no id dela.
    	System.out.println("\nInsira o id da conta que vc quer remover:");
    	int id = entrada.nextInt();
    	Conexao.RemovendoConta(conn, id);

    	System.out.println("Alteração feita: ");
    	Conexao.ExibindoContas(conn);
    	
    }
       
}
