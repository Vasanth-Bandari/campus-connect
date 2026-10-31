package com.campusconnect.dto.company;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyResponse {

    private Long id;
    private String name;
    private String description;
    private String industry;
    private String website;
    private String logoUrl;
    private boolean approved;
}
