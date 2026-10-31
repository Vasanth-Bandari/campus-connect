package com.campusconnect.service;

import com.campusconnect.dto.company.CompanyRequest;
import com.campusconnect.dto.company.CompanyResponse;
import com.campusconnect.entity.Company;
import com.campusconnect.exception.DuplicateResourceException;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;

    @Transactional
    public CompanyResponse createCompany(CompanyRequest request) {
        if (companyRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException("Company already exists with name: " + request.getName());
        }

        Company company = Company.builder()
                .name(request.getName().trim())
                .description(request.getDescription().trim())
                .industry(request.getIndustry().trim())
                .website(request.getWebsite().trim())
                .logoUrl(request.getLogoUrl())
                .approved(false)
                .build();

        Company saved = companyRepository.save(company);
        return mapToCompanyResponse(saved);
    }

    @Transactional(readOnly = true)
    public CompanyResponse getCompany(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found with ID: " + id));
        return mapToCompanyResponse(company);
    }

    @Transactional(readOnly = true)
    public List<CompanyResponse> getAllCompanies() {
        return companyRepository.findAll().stream()
                .map(this::mapToCompanyResponse)
                .toList();
    }

    @Transactional
    public CompanyResponse updateCompany(Long id, CompanyRequest request) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found with ID: " + id));

        if (!company.getName().equalsIgnoreCase(request.getName().trim()) &&
                companyRepository.existsByName(request.getName().trim())) {
            throw new DuplicateResourceException("Company already exists with name: " + request.getName());
        }

        company.setName(request.getName().trim());
        company.setDescription(request.getDescription().trim());
        company.setIndustry(request.getIndustry().trim());
        company.setWebsite(request.getWebsite().trim());
        if (request.getLogoUrl() != null) {
            company.setLogoUrl(request.getLogoUrl());
        }

        Company updated = companyRepository.save(company);
        return mapToCompanyResponse(updated);
    }

    @Transactional
    public void approveCompany(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found with ID: " + id));
        company.setApproved(true);
        companyRepository.save(company);
    }

    public CompanyResponse mapToCompanyResponse(Company company) {
        return CompanyResponse.builder()
                .id(company.getId())
                .name(company.getName())
                .description(company.getDescription())
                .industry(company.getIndustry())
                .website(company.getWebsite())
                .logoUrl(company.getLogoUrl())
                .approved(company.isApproved())
                .build();
    }
}
