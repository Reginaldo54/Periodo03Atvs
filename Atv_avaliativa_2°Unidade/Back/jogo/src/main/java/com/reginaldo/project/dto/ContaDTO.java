package com.reginaldo.project.dto;

import java.io.Serializable;
import java.time.LocalDate;


public class ContaDTO implements Serializable 
{
	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	private String nickname;
	
	private String senha;
	
	private String email;
	
	private LocalDate dataNascimento;
	
	private String idioma;
	
	
	
	public ContaDTO() {
		super();
	}


	public ContaDTO(Long id, String nickname, String senha, String email, LocalDate dataNascimento, String idioma) {
		super();
		this.id = id;
		this.nickname = nickname;
		this.senha = senha;
		this.email = email;
		this.dataNascimento = dataNascimento;
		this.idioma = idioma;
	}


	public LocalDate getDataNascimento() {
		return dataNascimento;
	}


	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}


	public String getIdioma() {
		return idioma;
	}


	public void setIdioma(String idioma) {
		this.idioma = idioma;
	}


	public Long getId() {
		return id;
	}

	
	public void setId(Long id) {
		this.id = id;
	}


	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
