function ContaCreate()
{
    // pegando inputs
    const email = document.getElementById("email").value;
    const nickname = document.getElementById("nickname").value;
    const idioma = document.getElementById("idioma").value;
    const dataNasc = document.getElementById("dataNasc").value;
    const senha = document.getElementById("senha").value;
    const confirmaSenha = document.getElementById("confirmaSenha").value;

    if(senha === confirmaSenha)
    {   
        HashSaltFixed(senha)
        .then(hash => {
            console.log('Senha Criptografada:', hash);
             // mandando pro back
            fetch('http://localhost:8080/api/conta/create', {
                method: 'POST',
                headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                email: email,
                nickname: nickname,
                senha: hash,
                dataNascimento: dataNasc,
                idioma: idioma
                                     })
             })
            .then(response => response.json())
            .then(alert("Conta criada com sucesso!"))
            .catch(error => console.error('Erro ao criar a Conta:', error));
            })
        .catch(error => {
           console.error('Erro ao criar senha criptografada:', error);
          })
     }
     else
     {
        alert("Senhas não batem");
     }
}

function GetAllContas()
{
    let array = [];
    //const Tabela = document.getElementById("mostrarUsuarios");

    // Requisição para o back
    fetch('http://localhost:8080/api/conta/getall')
    .then(response => response.json())
    .then(
        
        function (data)
        { 
            let tabelaHTML = `
                <table>
                    <thead>
                        <tr style="border: 1px solid black;">
                            <th>ID</th>
                            <th>Email</th>
                            <th>Nickname</th>
                            <th>Data de Nascimento</th>
                            <th>Idioma</th>
                            <th>Senha</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.forEach(objeto => {
                tabelaHTML += `
                    <tr>
                        <td>${objeto.id}</td>
                        <td>${objeto.email}</td>
                        <td>${objeto.nickname}</td>
                        <td>${objeto.dataNascimento}</td>
                        <td>${objeto.idioma}</td>
                        <td>${objeto.senha}</td>
                        
                    </tr>
                `;
            });

            tabelaHTML += `
                    </tbody>
                </table>
            `;

            const tabelaContainer = document.getElementById('tabelaContainer');
            tabelaContainer.innerHTML = tabelaHTML;
            alert("Listado com sucesso!")

         }
        )
    .catch(error => console.error('Erro ao obter contas:', error));

   

}

function GetContaById()
{
    // Pegando id
    const id = document.getElementById("id").value;
    const senha = document.getElementById("senhaAtual").value;

    let senhaBack = "";

    HashSaltFixed(senha)
    .then(hash => {
     console.log('Senha Criptografada:', hash);

        // Fazer Requisição ao back
        fetch(`http://localhost:8080/api/conta/getid/${id}`)
        .then(response => response.json())
        .then( function(data)
            {
                
                senhaBack = data.senha;
                if(hash === senhaBack)
                {
                   
                 
                    // Mostrar na tela os dados - forma de tabela
                   
                    let tabelaHTML = `
                        <table>
                            <thead>
                                <tr style="border: 1px solid black;">
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Nickname</th>
                                    <th>Data de Nascimento</th>
                                    <th>Idioma</th>
                                    <th>Senha</th>
                                </tr>
                            </thead>
                            <tbody>
                    `;
        
                 
                    tabelaHTML += `
                        <tr>
                            <td>${data["id"]}</td>
                            <td>${data.email}</td>
                            <td>${data.nickname}</td>
                            <td>${data.dataNascimento}</td>
                            <td>${data.idioma}</td>
                            <td>${data.senha}</td>
                            
                        </tr>
                    `;
                    


                    tabelaHTML += `
                            </tbody>
                        </table>
                    `;
        
                    const tabelaContainer = document.getElementById('tabelaContainer');
                    tabelaContainer.innerHTML = tabelaHTML;
                    alert("Conta pega com sucesso!");
                    
                }
                else
                {
                    alert("senha incorreta");
                } 
            })
        .catch(error => console.error('Erro ao obter Conta:', error));
    })
    .catch(error => {
    console.error('Erro ao criar senha criptografada:', error);
    })
}

function UpdateConta()
{
    const id = document.getElementById("id").value;
    const senhaAtual = document.getElementById("senhaAtual").value;

    // Pegando inputs
    const email = document.getElementById("email").value;
    const nickname = document.getElementById("nickname").value;
    const idioma = document.getElementById("idioma").value;
    const dataNasc = document.getElementById("dataNasc").value;
    const senha = ValidandoSenha();
    
      // Pegando id

      // Pegou a senha
      HashSaltFixed(senhaAtual)
      .then(hash => {
       console.log('Senha Criptografada:', hash);

          // Fazer Requisição ao back
          fetch(`http://localhost:8080/api/conta/getid/${id}`)
          .then(response => response.json())
          .then( function(data)
              {
                    if(data.senha === hash)
                    {
                        
                    // Requisição put
                    fetch(`http://localhost:8080/api/conta/update/${id}`, {
                        method: 'PUT',
                        headers: {
                          "Accept": "application/json",
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 
                            email: email,
                            nickname: nickname,
                            senha: senha,
                            dataNascimenot: dataNasc,
                            idioma: idioma 
                        })
                      })
                      .then(response => response.json())
                      
                      .then(alert("Conta Atualizada com sucesso!"))
                      .catch(error => console.error('Erro ao atualizar conta:', error));
                    
                    }  
                    else
                    {
                        alert("Senha atual incorreta");
                    }
              })
          .catch(error => console.error('Erro ao obter Conta:', error));
      })
      .catch(error => {
      console.error('Erro ao criar senha criptografada:', error);
      })
    
  
}

function DeleteValidation()
{
    // Pegando id
    const id = document.getElementById("id").value;
    const senha = document.getElementById("senhaAtual").value;

    let senhaBack = "";

    HashSaltFixed(senha)
    .then(hash => {
     console.log('Senha Criptografada:', hash);

        // Fazer Requisição ao back
        fetch(`http://localhost:8080/api/conta/getid/${id}`)
        .then(response => response.json())
        .then( function (data)
            {
                senhaBack = data.senha;
                if(hash === senhaBack)
                {
                    DeleteConta();
                }
                else
                {
                    alert("senha incorreta");
                } 
            })
        .catch(error => console.error('Erro ao obter Conta:', error));
    })
    .catch(error => {
    console.error('Erro ao criar senha criptografada:', error);
    })

}


function DeleteConta()
{
     // Pegando id
     const deleteId = document.getElementById("id").value;

     // Fazer Requisição para deletar

     fetch(`http://localhost:8080/api/conta/delete/${deleteId}`, {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(alert('Conta excluída com sucesso'))
      .catch(error => console.error('Erro ao excluir conta:', error));

}