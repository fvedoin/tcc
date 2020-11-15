const risks = [
    {
        name: 'Project Fit to Customer Organization',
        risk_classification_id: 1
    },
    {
        name: 'Project Fit to Provider Organization',
        risk_classification_id: 1
    },
    {
        name: 'Customer Perception',
        risk_classification_id: 1
    },
    {
        name: 'Work Flow',
        risk_classification_id: 1
    },
    {
        name: 'Goals Conflict',
        risk_classification_id: 2
    },
    {
        name: 'Resource Conflict',
        risk_classification_id: 2
    },
    {
        name: 'Customer Conflict',
        risk_classification_id: 2
    },
    {
        name: 'Leadership',
        risk_classification_id: 2
    },
    {
        name: 'Program Manager Experience',
        risk_classification_id: 2
    },
    {
        name: 'Definition of the Program',
        risk_classification_id: 2
    },
    {
        name: 'Political Influences',
        risk_classification_id: 3
    },
    {
        name: 'Convenient Date',
        risk_classification_id: 3
    },
    {
        name: 'Attractive Technology',
        risk_classification_id: 3
    },
    {
        name: 'Short Term Solution',
        risk_classification_id: 3
    },
    {
        name: 'Organization Stability',
        risk_classification_id: 4
    },
    {
        name: 'Organization Roles and Responsibilities',
        risk_classification_id: 4
    },
    {
        name: 'Policies and Standards',
        risk_classification_id: 4
    },
    {
        name: 'Management Support',
        risk_classification_id: 4
    },
    {
        name: 'Executive Involvement',
        risk_classification_id: 4
    },
    {
        name: 'Project Objectives',
        risk_classification_id: 4
    },
    {
        name: 'User Involvement',
        risk_classification_id: 5
    },
    {
        name: 'User Experience',
        risk_classification_id: 5
    },
    {
        name: 'User Acceptance',
        risk_classification_id: 5
    },
    {
        name: 'User Training Needs',
        risk_classification_id: 5
    },
    {
        name: 'User Justification',
        risk_classification_id: 5
    },
    {
        name: 'Project Size',
        risk_classification_id: 6
    },
    {
        name: 'Hardware Constraints',
        risk_classification_id: 6
    },
    {
        name: 'Reusable Components',
        risk_classification_id: 6
    },
    {
        name: 'Supplied Components',
        risk_classification_id: 6
    },
    {
        name: 'Budget Size',
        risk_classification_id: 6
    },
    {
        name: 'Budget Constraints',
        risk_classification_id: 6
    },
    {
        name: 'Cost Controls',
        risk_classification_id: 6
    },
    {
        name: 'Delivery Commitment',
        risk_classification_id: 6
    },
    {
        name: 'Development Schedule',
        risk_classification_id: 6
    },
    {
        name: 'Requirements Stability',
        risk_classification_id: 7
    },
    {
        name: 'Requirements Complete and Clear',
        risk_classification_id: 7
    },
    {
        name: 'Testability',
        risk_classification_id: 7
    },
    {
        name: 'Design Difficulty',
        risk_classification_id: 7
    },
    {
        name: 'Implementation Difficulty',
        risk_classification_id: 7
    },
    {
        name: 'System Dependencies',
        risk_classification_id: 7
    },
    {
        name: 'Hardware Resources for Deliverables',
        risk_classification_id: 8
    },
    {
        name: 'Response or other Performance Factors',
        risk_classification_id: 8
    },
    {
        name: 'Customer Service Impact',
        risk_classification_id: 8
    },
    {
        name: 'Data Migration Required',
        risk_classification_id: 8
    },
    {
        name: 'Pilot Approach',
        risk_classification_id: 8
    },
    {
        name: 'External Hardware or Software Interfaces',
        risk_classification_id: 8
    },
    {
        name: 'Alternatives Analysis',
        risk_classification_id: 9
    },
    {
        name: 'Commitment Process',
        risk_classification_id: 9
    },
    {
        name: 'Quality Assurance Approach',
        risk_classification_id: 9
    },
    {
        name: 'Development Documentation',
        risk_classification_id: 9
    },
    {
        name: 'Use of Defined Engineering Process',
        risk_classification_id: 9
    },
    {
        name: 'Early Identification of Defects',
        risk_classification_id: 9
    },
    {
        name: 'Defect Tracking',
        risk_classification_id: 9
    },
    {
        name: 'Change Control for Work Products',
        risk_classification_id: 9
    },
    {
        name: 'Physical Facilities',
        risk_classification_id: 10
    },
    {
        name: 'Hardware Platform',
        risk_classification_id: 10
    },
    {
        name: 'Tools Availability',
        risk_classification_id: 10
    },
    {
        name: 'Vendor Support',
        risk_classification_id: 10
    },
    {
        name: 'Contract Fit',
        risk_classification_id: 10
    },
    {
        name: 'Disaster Recovery',
        risk_classification_id: 10
    },
    {
        name: 'PM Approach',
        risk_classification_id: 11
    },
    {
        name: 'PM Communication',
        risk_classification_id: 11
    },
    {
        name: 'PM Experience',
        risk_classification_id: 11
    },
    {
        name: 'PM Attitude',
        risk_classification_id: 11
    },
    {
        name: 'PM Authority',
        risk_classification_id: 11
    },
    {
        name: 'Support of the PM',
        risk_classification_id: 11
    },
    {
        name: 'Team Member Availability',
        risk_classification_id: 12
    },
    {
        name: 'Mix of Team Skills',
        risk_classification_id: 12
    },
    {
        name: 'Application Experience',
        risk_classification_id: 12
    },
    {
        name: 'Experience with Project Hardware and Software',
        risk_classification_id: 12
    },
    {
        name: 'Experience with Process',
        risk_classification_id: 12
    },
    {
        name: 'Training of Team',
        risk_classification_id: 12
    },
    {
        name: 'Team Spirit and Attitude',
        risk_classification_id: 12
    },
    {
        name: 'Team Productivity',
        risk_classification_id: 12
    },
    {
        name: 'Expertise with Application Area (Domain)',
        risk_classification_id: 12
    },
    {
        name: 'Technology Match to Project',
        risk_classification_id: 13
    },
    {
        name: 'Technology Experience of Project Team',
        risk_classification_id: 13
    },
    {
        name: 'Availability of Technology Expertise',
        risk_classification_id: 13
    },
    {
        name: 'Maturity of Technology',
        risk_classification_id: 13
    },
    {
        name: 'Design Complexity',
        risk_classification_id: 14
    },
    {
        name: 'Support Personnel',
        risk_classification_id: 14
    },
    {
        name: 'Vendor Suppor',
        risk_classification_id: 14
    }
];

export default risks;