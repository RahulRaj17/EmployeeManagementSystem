package com.practice.springboot.controller;

import com.practice.springboot.exception.ResourceNotFoundException;
import com.practice.springboot.model.Employee;
import com.practice.springboot.repository.EmployeeRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    //Create Employee
    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee){
        return employeeRepository.save(employee);
    }

    //Get Employee by ID
    @GetMapping("{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable long id){
        Employee employee = employeeRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Employee not found with given ID " + id));
        return ResponseEntity.ok(employee);
    }

    //Update Employee
    @PutMapping("{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable long id, @RequestBody Employee employeeDetails){
        Employee employee = employeeRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Employee not found with given ID"));
        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmailId(employeeDetails.getEmailId());

        employeeRepository.save(employee);

        return ResponseEntity.ok(employee);
    }

    //Delete Employee
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable long id){
        Employee employee = employeeRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Employee not found with given ID"));

        employeeRepository.delete(employee);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
