package com.campusconnect.dto.eligibility;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EligibilityResponse {

    private boolean eligible;
    @Builder.Default
    private List<EligibilityCriterion> criteria = new ArrayList<>();
    private String summary;
}
