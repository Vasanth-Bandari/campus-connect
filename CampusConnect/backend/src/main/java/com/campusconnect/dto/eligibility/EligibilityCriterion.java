package com.campusconnect.dto.eligibility;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EligibilityCriterion {

    private String name;
    private String required;
    private String actual;
    private boolean passed;
}
