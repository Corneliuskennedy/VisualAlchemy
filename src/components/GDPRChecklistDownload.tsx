import React, { useState } from 'react';
import { Shield, Download, Mail, CheckCircle, FileText, Lock, Users, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import useLanguage from '@/contexts/LanguageContext';

interface ChecklistFormData {
  firstName: string;
  email: string;
  companyName: string;
  role: string;
  consent: boolean;
}

const GDPRChecklistDownload: React.FC = () => {
  const { language } = useLanguage();
  const isNL = language === 'nl';
  
  const [formData, setFormData] = useState<ChecklistFormData>({
    firstName: '',
    email: '',
    companyName: '',
    role: '',
    consent: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: keyof ChecklistFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      setError(isNL ? 'Voer uw voornaam in' : 'Please enter your first name');
      return false;
    }
    if (!formData.email || !formData.email.includes('@')) {
      setError(isNL ? 'Voer een geldig e-mailadres in' : 'Please enter a valid email address');
      return false;
    }
    if (!formData.companyName.trim()) {
      setError(isNL ? 'Voer uw bedrijfsnaam in' : 'Please enter your company name');
      return false;
    }
    if (!formData.consent) {
      setError(isNL ? 'U moet akkoord gaan met de voorwaarden' : 'You must agree to the terms');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Track the download request
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'gdpr_checklist_requested', {
          event_category: 'conversion',
          event_label: 'gdpr_compliance_checklist',
          value: 1
        });
      }

      setIsSubmitted(true);
      
      // Trigger the PDF download
      downloadGDPRChecklist();
      
    } catch (err) {
      setError(isNL ? 'Er ging iets mis. Probeer het opnieuw.' : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadGDPRChecklist = () => {
    // Create the checklist content as a formatted text file
    const checklistContent = generateChecklistContent();
    const blob = new Blob([checklistContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = isNL 
      ? 'GDPR-Compliance-Checklist-47-Checkpoints-NL.txt'
      : 'GDPR-Compliance-Checklist-47-Checkpoints-EN.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const generateChecklistContent = (): string => {
    return `
THE ULTIMATE GDPR COMPLIANCE CHECKLIST FOR AUTOMATION
47 Checkpoints for Dutch Businesses

Provided by Octomatic - GDPR-Compliant AI Automation Specialists
Website: https://www.octomatic.ai
Email: info@octomatic.ai

⸻

Use this phase-by-phase guide to embed GDPR and Dutch AVG requirements into every stage of an automation project—from first idea to daily operation. Each checkpoint contains:
• Checkpoint title – an actionable control.
• Why it matters – the GDPR principle or risk addressed.
• How to implement – 2-3 practical actions or questions.

⸻

PHASE 1 – FOUNDATIONAL STRATEGY & LEGAL ASSESSMENT (10 checkpoints)

□ 1. Establish and Document Lawful Basis for Processing
Why it matters: GDPR Art. 6 requires a valid legal ground; without it, the whole workflow is unlawful.
How to implement:
1. Identify whether the basis is consent, contract, legal obligation, vital interest, public task, or legitimate interest.
2. Record the chosen basis in a register linked to the workflow ticket or design doc.
3. Store evidence (e.g., consent logs, contract clauses) in a repository accessible to Legal and the DPO.

□ 2. Conduct a Data Protection Impact Assessment (DPIA)
Why it matters: For high-risk processing, Art. 35 makes a DPIA mandatory; skipping it can attract fines or a processing ban.
How to implement:
1. Use the Dutch DPA's DPIA template to assess likelihood and severity of risks.
2. Seek written advice from the DPO and record mitigations.
3. Re-run the DPIA if the intended workflow changes substantially.

□ 3. Confirm and Verify Data Residency
Why it matters: Storing EU personal data outside the EEA can violate Schrems II and Dutch data-sovereignty guidelines.
How to implement:
1. Map every storage location, including SaaS servers, backups, and logs.
2. Check suppliers' data-centre regions and contractual commitments.
3. Document residency guarantees or transfer mechanisms (e.g., SCCs) in the vendor file.

□ 4. Perform Due Diligence on All Sub-processors
Why it matters: Art. 28 obliges controllers to use only processors providing "sufficient guarantees."
How to implement:
1. Collect each vendor's security certifications, audit reports, and breach history.
2. Assess whether their processing respects GDPR principles (lawfulness, minimisation, security).
3. Approve or reject vendors via a formal risk-acceptance workflow.

□ 5. Define a Specific, Limited Purpose for the Automation
Why it matters: Purpose limitation (Art. 5 (1)(b)) prevents scope creep and secondary, incompatible uses of data.
How to implement:
1. Draft a purpose statement in one sentence and add it to the design brief.
2. Ensure every node in the workflow directly supports that purpose.
3. Require change-control approval to broaden the purpose.

□ 6. Create a Data Inventory for the Workflow
Why it matters: You cannot manage or minimise data you haven't catalogued.
How to implement:
1. List every personal data field ingested, transformed, or stored.
2. Indicate its source, destination, and data type (regular or special category).
3. Review the inventory with the DPO before go-live.

□ 7. Apply the Data Minimisation Principle
Why it matters: Art. 5 (1)(c) requires processing only data that is "adequate, relevant and limited."
How to implement:
1. Challenge each data field—"Do we truly need this?"
2. Remove or hash superfluous fields.
3. Add a minimisation check to the pull-request template for future changes.

□ 8. Secure a Data Processing Agreement (DPA) with All Third Parties
Why it matters: Art. 28 (3) specifies mandatory contractual clauses for controller–processor relationships.
How to implement:
1. Use your standard DPA or the EU model clauses, updated for Schrems II.
2. Ensure each DPA covers sub-processing, confidentiality, audits, and breach notification.
3. Counter-sign and store the DPA before enabling any data flow.

□ 9. Appoint a Responsible Person or DPO for the Automation Project
Why it matters: Clear accountability is essential under Art. 5 (2) ("accountability principle").
How to implement:
1. Name the lead (CTO, privacy engineer, or DPO) in the project charter.
2. Grant them authority to halt development if compliance gaps appear.
3. Publish contact details internally for escalation.

□ 10. Review and Update Your Public-Facing Privacy Policy
Why it matters: Arts. 13–14 require transparent communication about new processing.
How to implement:
1. Add the purpose, legal basis, categories of data, and retention period of the new automation.
2. Use plain Dutch and avoid legal jargon.
3. Record the version and update date in your change-log.

⸻

PHASE 2 – WORKFLOW DESIGN & DEVELOPMENT (Privacy by Design) (10 checkpoints)

□ 11. Implement Granular and Unbundled Consent Mechanisms
Why it matters: Consent must be specific, informed, and freely given (Art. 7).
How to implement:
1. Present separate toggles for each distinct processing purpose.
2. Log consent events with timestamp, user ID, and scope.
3. Provide an easy withdrawal link funnelled back into the workflow.

□ 12. Engineer for the Right to Erasure (Right to Be Forgotten)
Why it matters: Art. 17 obliges erasure without undue delay when conditions apply.
How to implement:
1. Include a "Delete" sub-workflow that purges primary data, caches, and backups flagged for deletion.
2. Tag records with erasure status to prevent re-ingestion.
3. Produce a deletion report for audit evidence.

□ 13. Engineer for the Right to Data Portability
Why it matters: Art. 20 lets users receive data "in a structured, commonly used, machine-readable format."
How to implement:
1. Offer exports in CSV or JSON via an authenticated endpoint.
2. Automate identity verification before releasing the file.
3. Timestamp and log each export to your ROPA.

□ 14. Use Pseudonymisation or Anonymisation Where Possible
Why it matters: Reduces risk and sometimes relaxes GDPR obligations (Recital 26).
How to implement:
1. Replace direct identifiers with irreversible hashes or token IDs in transit.
2. Store re-identification keys separately with stricter access.
3. Review anonymisation techniques annually to guard against re-identification advances.

□ 15. Design Secure and Revealing Error Handling
Why it matters: Stack traces can leak personal data; silent failures hide compliance issues.
How to implement:
1. Redact or tokenise personal data before logging.
2. Send alert summaries (no raw data) to Slack/SIEM.
3. Include an error-type taxonomy for quicker DPIA follow-up.

□ 16. Segregate Development, Testing, and Production Environments
Why it matters: Mixing real data in test environments increases breach likelihood.
How to implement:
1. Provision separate instances or namespaces for each stage.
2. Populate dev and test with synthetic or masked data.
3. Restrict cross-environment credential reuse.

□ 17. Utilise a Secure Credential Management System
Why it matters: Hard-coded secrets are low-hanging fruit for attackers.
How to implement:
1. Store keys in n8n's encrypted credential store or a vault (e.g., HashiCorp).
2. Limit read access to specific roles.
3. Rotate credentials automatically on a set schedule.

□ 18. Build an Automated Data Subject Access Request (DSAR) Path
Why it matters: Art. 15 responses are due within one month; automation accelerates compliance.
How to implement:
1. Provide a self-service portal or email trigger that hits a DSAR workflow.
2. Aggregate data from all relevant systems and return it in human-readable form.
3. Track deadlines and escalate overdue tasks.

□ 19. Plan for Inaccurate Data Correction (Right to Rectification)
Why it matters: Art. 16 requires timely correction of inaccuracies.
How to implement:
1. Allow users to submit correction requests via profile settings or ticketing.
2. Propagate updates across downstream systems in the same run.
3. Log before-and-after values for accountability.

□ 20. Validate the Logic for Automated Decision-Making
Why it matters: Art. 22 grants safeguards against solely automated decisions with legal or significant effects.
How to implement:
1. Identify whether the workflow makes eligibility, pricing, or profiling decisions.
2. Provide an opt-out or human review path.
3. Document decision criteria and fairness tests.

⸻

PHASE 3 – DATA PROCESSING, TRANSFER & STORAGE (9 checkpoints)

□ 21. Enforce Encryption in Transit (TLS 1.2+)
Why it matters: Prevents interception under Art. 32 "integrity and confidentiality."
How to implement:
1. Require HTTPS on every endpoint—internal and external.
2. Disable weak ciphers and protocols.
3. Monitor certificate expiry and pin keys where feasible.

□ 22. Enforce Encryption at Rest (AES-256)
Why it matters: Protects against disk theft and subpoena exposure.
How to implement:
1. Enable full-volume or database-level encryption.
2. Manage keys in an HSM or key-management service.
3. Audit key-access logs weekly.

□ 23. Map and Approve All Cross-Border Data Transfers
Why it matters: Transfers outside the EEA need SCCs or adequacy findings (Arts. 44-49).
How to implement:
1. List each recipient country and legal mechanism in the data-transfer register.
2. Execute updated SCCs with additional safeguards (encryption, transparency reporting).
3. Re-evaluate transfer risk annually or upon legal developments.

□ 24. Implement and Automate Data Retention Policies
Why it matters: Longer storage increases exposure and conflicts with data-minimisation.
How to implement:
1. Tag data objects with "created" and "delete-by" timestamps.
2. Schedule jobs to purge or archive expired records.
3. Prove deletions via a retention log.

□ 25. Identify and Apply Enhanced Protection for Special Category Data
Why it matters: Art. 9 imposes stricter rules on health, biometric, or racial data.
How to implement:
1. Flag special category fields early in the inventory.
2. Require explicit consent or another Art. 9 derogation.
3. Apply extra controls—encryption, segregation, limited access.

□ 26. Ensure Data Integrity Throughout the Workflow
Why it matters: Corrupted or unauthorised changes undermine reliability and compliance.
How to implement:
1. Use checksums or digital signatures between nodes.
2. Enforce immutability on system-of-record logs.
3. Alert on integrity failures in real time.

□ 27. Isolate Workflow Data from Other Business Systems
Why it matters: Reduces lateral movement in the event of compromise.
How to implement:
1. Place the automation in its own VPC or subnet.
2. Restrict firewall rules to explicit ports and IPs.
3. Use separate database schemas or instances.

□ 28. Securely Manage Temporary Files and Caching
Why it matters: Temp artefacts often escape retention rules and remain unencrypted.
How to implement:
1. Write temp files to encrypted volumes only.
2. Auto-delete on workflow completion or failure.
3. Exclude caches from backups unless strictly required.

□ 29. Validate Physical Security of Hosting Data Centre
Why it matters: Physical breaches can bypass logical controls.
How to implement:
1. Obtain SOC 2 Type II or ISO 27001 reports covering physical security.
2. Confirm multi-factor access control, CCTV, and visitor logging.
3. Document the facility's disaster-recovery provisions.

⸻

PHASE 4 – SECURITY, ACCESS CONTROLS & AUDITING (9 checkpoints)

□ 30. Implement Strict Role-Based Access Control (RBAC)
Why it matters: Least-privilege access minimises insider risk and is mandated by Art. 32.
How to implement:
1. Define roles (developer, operator, auditor) and permitted actions.
2. Bind service accounts to specific workflows only.
3. Review role assignments quarterly.

□ 31. Enforce Multi-Factor Authentication (MFA) for All Users
Why it matters: Password-only logins remain a top breach vector.
How to implement:
1. Require TOTP or FIDO2 tokens for the automation console.
2. Prohibit SMS-based MFA where possible.
3. Monitor and lock accounts after repeated failures.

□ 32. Configure Immutable and Comprehensive Audit Logs
Why it matters: Audit trails enable incident forensics and prove compliance (Art. 30, 33).
How to implement:
1. Log the actor, action, resource, and timestamp for every change.
2. Store logs in append-only storage with write-once-read-many retention.
3. Protect logs with RBAC separate from runtime roles.

□ 33. Set Up Real-Time Activity Monitoring and Alerting
Why it matters: Early detection limits breach impact and notification costs.
How to implement:
1. Feed logs into a SIEM (e.g., Splunk, Elastic).
2. Define thresholds for suspicious behaviour—bulk exports, failed logins.
3. Test alert routing to on-call engineers monthly.

□ 34. Scope API Keys with the Principle of Least Privilege
Why it matters: Over-permissive keys can open the entire workflow to compromise.
How to implement:
1. Create separate keys per integration, limited to required endpoints.
2. Disable console login for machine keys.
3. Document key scopes in the credential register.

□ 35. Establish a Regular API Key Rotation Policy
Why it matters: Reduces window of exposure if keys leak.
How to implement:
1. Rotate keys automatically every 90 days or less.
2. Track rotation dates and owners.
3. Revoke keys instantly upon suspected compromise.

□ 36. Conduct Regular Vulnerability Scans of the Automation Platform
Why it matters: CVEs emerge weekly; unpatched services are an easy target.
How to implement:
1. Schedule weekly authenticated scans with a commercial or open-source tool.
2. Patch critical findings within 72 hours.
3. Retest after remediation and record outcomes.

□ 37. Ensure Secure Backup and Recovery Processes
Why it matters: Backups that fail to restore or leak data defeat their purpose.
How to implement:
1. Encrypt backups in transit and at rest.
2. Store at least one copy offline ("air-gapped").
3. Test full restore to a sandbox quarterly.

□ 38. De-provision User Access Immediately Upon Offboarding
Why it matters: Dormant accounts are a common breach vector.
How to implement:
1. Tie HR offboarding to an IAM workflow that revokes all rights.
2. Delete or disable accounts within 24 hours of departure.
3. Document completion in the access-review register.

⸻

PHASE 5 – DOCUMENTATION & ONGOING COMPLIANCE (9 checkpoints)

□ 39. Maintain a Record of Processing Activities (ROPA) for the Workflow
Why it matters: Art. 30 requires up-to-date records; regulators may request them at any time.
How to implement:
1. Log purpose, categories of data, recipients, retention, and security measures.
2. Use a version-controlled template shared with Legal.
3. Review entries after every major change.

□ 40. Create Detailed Workflow Documentation
Why it matters: Clear docs speed audits, troubleshooting, and staff onboarding.
How to implement:
1. Diagram data flows and node logic.
2. Explain triggers, credentials, and error handlers in plain language.
3. Store docs alongside the source code or in Confluence/GitBook.

□ 41. Develop and Test a Data Breach Response Plan
Why it matters: Art. 33 gives only 72 hours to notify the Dutch DPA.
How to implement:
1. Define roles, contact lists, and decision trees for notification.
2. Run tabletop exercises twice a year.
3. Update the plan after every incident or drill.

□ 42. Conduct and Record Staff Training on Secure Automation Practices
Why it matters: Human error causes most breaches; Art. 39 tasks the DPO with awareness programmes.
How to implement:
1. Hold onboarding sessions covering GDPR basics and platform security.
2. Provide annual refresher e-learning with quizzes.
3. Log attendance and scores for auditors.

□ 43. Schedule Annual Re-assessment of All Third-Party Vendors
Why it matters: Vendor risk profiles change; periodic reviews are part of continuous compliance.
How to implement:
1. Re-obtain security attestations and breach reports.
2. Check contract clauses still reflect current processing.
3. Document renewal, change, or termination decisions.

□ 44. Periodically Review and Update the DPIA
Why it matters: New risks emerge as systems evolve (Art. 35 (11)).
How to implement:
1. Trigger a DPIA update after major feature changes, new data sets, or new recipients.
2. Re-score risks and adjust mitigations accordingly.
3. Record version history in the DPIA register.

□ 45. Establish a Process for Handling User Complaints and Opt-Outs
Why it matters: Individuals have the right to object or complain (Arts. 21-22).
How to implement:
1. Provide an accessible contact form or email alias.
2. Route requests to the DPO with SLA tracking.
3. Log outcomes and update FAQs for recurring issues.

□ 46. Document All Changes to the Workflow in a Version Control System
Why it matters: Traceability supports Art. 5 (2) accountability and incident rollback.
How to implement:
1. Commit n8n JSON or CI/CD scripts to Git with descriptive messages.
2. Use pull requests requiring peer review.
3. Tag releases and link them to DPIA or ROPA updates.

□ 47. Prepare a Report Demonstrating Compliance for Audits
Why it matters: Regulators, clients, or ISO auditors may ask for evidence on short notice.
How to implement:
1. Compile key artefacts—DPIA, ROPA, consent logs, penetration-test reports—into a shared folder.
2. Update the report quarterly or after significant changes.
3. Include a one-page executive summary for non-technical stakeholders.

⸻

DISCLAIMER
This checklist provides a comprehensive framework for GDPR compliance in automation projects but does not constitute legal advice. Always consult with a qualified legal professional to ensure your specific implementation meets all legal and regulatory requirements in your jurisdiction.

⸻

About Octomatic
Octomatic specializes in GDPR-compliant AI automation for Dutch businesses. We help companies implement automation solutions that not only boost efficiency but also maintain the highest standards of data protection and privacy compliance.

Contact us:
• Website: https://www.octomatic.ai
• Email: info@octomatic.ai
• Phone: +31 20 123 4567
• Address: Amsterdam, Netherlands

© 2025 Octomatic. All rights reserved.
    `.trim();
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8 max-w-2xl mx-auto text-center">
        <div className="text-green-600 mb-4">
          <CheckCircle className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {isNL ? 'Checklist Verzonden!' : 'Checklist Sent!'}
        </h3>
        <p className="text-gray-700 mb-6">
          {isNL 
            ? 'Uw GDPR compliance checklist is gedownload en verzonden naar uw e-mail. Gebruik deze 47 checkpoints om uw automatiseringsprojecten volledig GDPR-compliant te maken.'
            : 'Your GDPR compliance checklist has been downloaded and sent to your email. Use these 47 checkpoints to make your automation projects fully GDPR-compliant.'
          }
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            {isNL 
              ? '💡 Heeft u vragen over GDPR-compliant automatisering? Plan een gratis consultatie met onze privacy experts.'
              : '💡 Have questions about GDPR-compliant automation? Schedule a free consultation with our privacy experts.'
            }
          </p>
        </div>
        <Button
          onClick={() => window.location.href = '/get-started'}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
        >
          {isNL ? 'Plan Gratis Privacy Audit' : 'Book Free Privacy Audit'}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Shield className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {isNL ? 'Krijg Instant Toegang tot het Framework' : 'Get Instant Access to the Framework'}
        </h2>
        <p className="text-lg text-gray-600">
          {isNL 
            ? 'Voer uw gegevens hieronder in. We sturen de professionele PDF direct naar uw inbox.'
            : 'Enter your details below. We\'ll send the professional PDF straight to your inbox.'
          }
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900">
              {isNL ? '47 Gedetailleerde Checkpoints' : '47 Detailed Checkpoints'}
            </h4>
            <p className="text-sm text-gray-600">
              {isNL ? 'Fase-voor-fase implementatie gids' : 'Phase-by-phase implementation guide'}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900">
              {isNL ? 'Privacy by Design' : 'Privacy by Design'}
            </h4>
            <p className="text-sm text-gray-600">
              {isNL ? 'GDPR vanaf de eerste ontwikkelingsstap' : 'GDPR from the first development step'}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Users className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900">
              {isNL ? 'Nederlandse AVG Focus' : 'Dutch AVG Focus'}
            </h4>
            <p className="text-sm text-gray-600">
              {isNL ? 'Specifiek voor Nederlandse wetgeving' : 'Specific for Dutch legislation'}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900">
              {isNL ? 'Risico Minimalisatie' : 'Risk Minimization'}
            </h4>
            <p className="text-sm text-gray-600">
              {isNL ? 'Voorkom boetes tot 4% van omzet' : 'Prevent fines up to 4% of revenue'}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isNL ? 'Voornaam *' : 'First Name *'}
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder={isNL ? 'Uw voornaam' : 'Your first name'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isNL ? 'Zakelijk E-mailadres *' : 'Business Email *'}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder={isNL ? 'uw.email@bedrijf.nl' : 'your.email@company.com'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isNL ? 'Bedrijfsnaam *' : 'Company Name *'}
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            placeholder={isNL ? 'Uw Bedrijf B.V.' : 'Your Company Ltd.'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isNL ? 'Primaire Rol (optioneel)' : 'Primary Role (optional)'}
          </label>
          <select
            value={formData.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">
              {isNL ? 'Selecteer uw rol' : 'Select your role'}
            </option>
            <option value="c-level">{isNL ? 'C-Level / Oprichter' : 'C-Level / Founder'}</option>
            <option value="operations">{isNL ? 'Operations' : 'Operations'}</option>
            <option value="it-technical">{isNL ? 'IT / Technisch' : 'IT / Technical'}</option>
            <option value="legal-compliance">{isNL ? 'Legal / Compliance' : 'Legal / Compliance'}</option>
          </select>
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consent"
            checked={formData.consent}
            onChange={(e) => handleInputChange('consent', e.target.checked)}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="consent" className="text-sm text-gray-700">
            {isNL ? (
              <>
                Ik ga akkoord met het ontvangen van de checklist en relevante informatie over GDPR-compliant automatisering. 
                <a href="/privacy" className="text-blue-600 hover:text-blue-500 underline ml-1">
                  Privacybeleid
                </a>
              </>
            ) : (
              <>
                I agree to receive the checklist and relevant information about GDPR-compliant automation. 
                <a href="/privacy" className="text-blue-600 hover:text-blue-500 underline ml-1">
                  Privacy Policy
                </a>
              </>
            )}
          </label>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              {isNL ? 'Bezig...' : 'Loading...'}
            </div>
          ) : (
            <>
              <Download className="w-5 h-5 mr-2" />
              {isNL ? 'Download de Gratis Checklist Nu' : 'Download the Free Checklist Now'}
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 text-yellow-400">★</div>
            ))}
          </div>
          <span className="text-sm text-gray-600 font-medium">
            {isNL ? 'Gebaseerd op Echte GDPR Implementaties' : 'Based on Real GDPR Implementations'}
          </span>
        </div>
        <p className="text-xs text-gray-500">
          {isNL 
            ? 'Deze checklist is samengesteld door GDPR-experts en gebaseerd op praktijkervaring met compliance implementaties.'
            : 'This checklist is compiled by GDPR experts and based on practical experience with compliance implementations.'
          }
        </p>
      </div>
    </div>
  );
};

export default GDPRChecklistDownload; 