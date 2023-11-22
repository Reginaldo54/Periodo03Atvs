package com.reginaldo.project.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.reginaldo.project.dto.ContaDTO;
import com.reginaldo.project.model.ContaModel;
import com.reginaldo.project.repository.ContaRepository;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
		RequestMethod.DELETE })
@RestController
@RequestMapping("/api/conta")
public class ContaController {

	@Autowired
	private ContaRepository contaRepository;

	// GetAll
	@GetMapping("/getall")
	public List<ContaDTO> getAllUsers() {

		List<ContaModel> users = contaRepository.findAll();

		return users.stream().map(this::convertToDto).collect(Collectors.toList());
	}

	// GetByID
	@GetMapping("/getid/{id}")
	public ResponseEntity<ContaDTO> getUserById(@Valid @PathVariable Long id) {

		Optional<ContaModel> contaOptional = contaRepository.findById(id);

		// tem algo
		if (contaOptional.isPresent()) {

			// Instanciando
			ContaDTO contaDTO = new ContaDTO();

		
			BeanUtils.copyProperties(contaOptional.get(), contaDTO);
			return ResponseEntity.ok(contaDTO);
		}

		// Se estiver vázio não retorna nada
		return ResponseEntity.notFound().build();

	}


	@PostMapping("/create")
	public ResponseEntity<ContaModel> createUser(@Valid @RequestBody ContaDTO contaDTO) {

		
		ContaModel conta = new ContaModel();
		BeanUtils.copyProperties(contaDTO, conta);

		// retornando.
		return ResponseEntity.status(HttpStatus.CREATED).body(contaRepository.save(conta));
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<ContaDTO> updateUser(@Valid @PathVariable Long id, @RequestBody ContaDTO contaDTO) {

		// Localizando id...
		Optional<ContaModel> userOptional = contaRepository.findById(id);

		// Achou o id do put
		if (userOptional.isEmpty()) {
			// Não encontrado
			return ResponseEntity.notFound().build();
		}

		
		ContaModel oldConta = userOptional.get();

		
		ContaModel newConta = new ContaModel();
		BeanUtils.copyProperties(contaDTO, newConta);

		// Atualização pacial:

		// A Data da postagem não se altera.
		oldConta.setEmail(newConta.getEmail()); 
		oldConta.setNickname(newConta.getNickname());
		oldConta.setSenha(newConta.getSenha());
		oldConta.setIdioma(newConta.getIdioma());

		// Salvando
		ContaModel saveConta = contaRepository.save(oldConta);

		BeanUtils.copyProperties(saveConta, contaDTO);

		// retornando
		return ResponseEntity.ok(contaDTO);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteUser(@Valid @PathVariable Long id) {

		Optional<ContaModel> userOptional = contaRepository.findById(id);

		
		if (userOptional.isPresent()) {

			// deletar pelo id
			contaRepository.deleteById(id);

			return ResponseEntity.ok("Usuário deletado com sucesso!");
		}

		// Se não foi encontrado nada
		return ResponseEntity.notFound().build();

	}

	private ContaDTO convertToDto(ContaModel conta) {

		
		return new ContaDTO(conta.getId(),conta.getNickname(), conta.getSenha(), conta.getEmail(), conta.getDataNascimento(), conta.getIdioma());

	}

}
