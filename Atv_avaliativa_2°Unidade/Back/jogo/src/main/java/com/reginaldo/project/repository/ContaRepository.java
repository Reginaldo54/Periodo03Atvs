package com.reginaldo.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reginaldo.project.model.ContaModel;

public interface ContaRepository extends JpaRepository<ContaModel, Long>
{

}
