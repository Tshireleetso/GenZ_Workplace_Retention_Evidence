# Gen Z Workplace Retention Evidence Review

## Idea

The idea was to look at the disconnect between Gen Z employees and employers, with South Africa as the main context, and turn the published evidence into a clear management view.

The starting point was the IOL Cape Argus article published on 24 June 2026:

https://iol.co.za/capeargus/opinion/2026-06-24-understanding-the-disconnect-why-employers-are-firing-gen-z-employees/

The article raises an important question. Are younger employees simply less motivated, or are employers sometimes reading uncertainty, weak onboarding, unclear expectations, limited feedback and different career priorities as a lack of initiative?

Rather than treat the article as a dataset, I followed the figures back to published sources where possible and added current South African labour-market data for context.

## Data provenance

Every number shown in the analysis comes from a published source listed below. No employee-level records were generated and no survey responses were invented.

The figures come from different studies and populations, so they are not merged into one respondent-level dataset. Each metric keeps its own geography, population, period and source.

Main sources:

- Statistics South Africa, Q1 2026 youth labour-market data
- Deloitte South Africa, 2025 Gen Z development findings
- Deloitte Global, 2025 and 2026 Gen Z and Millennial Surveys
- Intelligent.com, August 2024 survey of 966 business leaders involved in entry-level hiring
- Bizcommunity summary of Stats SA QLFS Q1 2025 for province-level employment movement
- IOL Cape Argus, used as the original research brief and interpretation layer

The source register is available in `data/source_register.csv` and the full metric table is in `data/source_metrics.csv`.

## Question explored

What does published evidence suggest about the disconnect between younger employees and employers, and which management practices appear most relevant to retention and early-career performance?

## How the data was prepared

### 1. Source collection

I started with the IOL article, identified the quantitative claims it referenced and then collected supporting figures from the original or more direct sources where they were available.

### 2. Evidence register

For every metric I recorded:

- the measure
- the published value
- unit
- geography
- population
- time period
- source name
- source URL
- any context needed to interpret the number correctly

This step is important because a South African youth labour-market statistic cannot be treated as if it came from the same sample as a global Gen Z survey or an employer survey.

### 3. Cleaning and standardisation

The source figures were standardised into a common structure so that they could be charted without changing their meaning.

Percentages remain percentages. Counts remain counts. Geographic scope and survey population remain attached to each value. Labels were shortened for visualisation, but the original meaning was retained in the source table.

No missing values were filled with estimates. No respondent rows were created. No values were imputed.

### 4. Analysis

The evidence was grouped into four views:

- South African labour-market pressure
- South African Gen Z learning and development expectations
- employer concerns about recent graduate hires
- global Gen Z career and management preferences

The analysis is descriptive. Comparisons between different sources are used to identify patterns worth investigating, not to claim direct causation.

## What the evidence shows

### South African labour-market pressure

Stats SA reported that in Q1 2026 the unemployment rate was 60.9% for people aged 15 to 24 and 40.6% for those aged 25 to 34. The NEET rate was 37.6% for ages 15 to 24 and 45.6% for ages 15 to 34.

Among employed people aged 15 to 34, the largest published industry shares were Trade at 23.6%, Community and Social Services at 19.9%, and Finance at 18.5%.

### Development expectations among South African Gen Z respondents

Deloitte South Africa reported that 69% of Gen Z respondents were actively developing their skills weekly. Formal training was valued by 98%, on-the-job learning by 97%, mentorship by 97%, feedback and performance reviews by 94%, and workshops or conferences by 92%.

These figures make it difficult to reduce the workplace disconnect to a simple lack of interest in development.

### Employer concerns about recent graduate hires

In Intelligent.com's August 2024 survey of 966 business leaders involved in entry-level hiring, 75% said some or all recent graduate hires had been unsatisfactory and 60% reported firing a recent college graduate hire that year.

The most frequently cited reasons for hires not working out included lack of motivation or initiative at 50%, lack of professionalism at 46%, poor communication at 39%, struggles with feedback at 38%, and inadequate problem-solving at 34%.

The same source also argues that employers have a role in preparing recent graduates through clearer onboarding, expectations, mentoring and feedback.

### Career progression and manager support

Deloitte's 2026 global survey found that 44% of Gen Z respondents preferred steady career progress, 25% preferred rapid promotions, and 21% were willing to move laterally or take a step back to find the right role.

Deloitte's 2025 global survey found that 50% of Gen Z respondents wanted managers to teach and mentor them, while 36% said this happened in practice.

## Management interpretation

The evidence points to a more useful question than whether Gen Z is motivated enough.

A stronger management question is whether early-career employees are being given enough clarity, feedback, practical learning and visible development pathways to know how to succeed in the organisation.

The employer-side concerns are real in the survey data. So are the employee-side expectations for learning, mentorship and feedback. Both can be true at the same time.

Practical areas to test include:

1. clearer role expectations during onboarding
2. explicit guidance on where initiative is expected and where approval is required
3. regular feedback rather than relying only on formal reviews
4. mentorship or buddy structures for new employees
5. visible development pathways that allow steady growth as well as promotion
6. measurement of early-tenure exits, performance issues, feedback quality and internal mobility before and after changes

## Dashboard

The interactive view is in `docs/index.html` and can be published with GitHub Pages.

The page contains:

- current South African youth labour-market indicators
- South African Gen Z development preferences
- employer concerns about recent graduate hires
- global Gen Z career progression preferences
- manager-support findings
- a province employment-change view for labour-market context
- source links beside the evidence

The page has an evidence-view selector so that South African, employer-side and global findings can be reviewed separately.

## Excel analysis

`data/GenZ_Workplace_Retention_Evidence.xlsx` contains:

- `Dashboard` - visual summary
- `Source Metrics` - all published numerical values used
- `Province Context` - published province employment movement
- `Sources` - source register and URLs
- `Method` - preparation and interpretation notes

## SQL

`sql/analysis_queries.sql` shows how the same source register could be queried after importing `source_metrics.csv` into a database table.

## Presentation

`presentation/GenZ_Workplace_Retention_Evidence.pptx` summarises the evidence and management implications for a stakeholder discussion.

## GitHub Pages

To publish the interactive view:

1. Push the repository to GitHub.
2. Open **Settings**.
3. Open **Pages**.
4. Choose **Deploy from a branch**.
5. Select the `main` branch and `/docs` folder.
6. Save.

## Sources

IOL Cape Argus  
https://iol.co.za/capeargus/opinion/2026-06-24-understanding-the-disconnect-why-employers-are-firing-gen-z-employees/

Statistics South Africa  
https://www.statssa.gov.za/?p=19526

Deloitte South Africa  
https://www.linkedin.com/posts/deloitte_careergrowth-genz-millennials-activity-7346447611979071489-KPCC

Deloitte Global 2026  
https://www.deloitte.com/global/en/about/press-room/deloitte-2026-gen-z-and-millennial-survey.html

Deloitte Global 2025  
https://www.deloitte.com/global/en/about/press-room/deloitte-2025-gen-z-and-millennial-survey.html

Intelligent.com  
https://www.intelligent.com/1-in-6-companies-are-hesitant-to-hire-recent-college-graduates/

Bizcommunity / Stats SA QLFS context  
https://www.bizcommunity.com/article/unemployment-climbs-to-329-in-2025-q1-473939a

## Interpretation note

The sources cover different populations, countries and time periods. They should not be combined as if they came from one survey. The value of the analysis is in separating those populations clearly, then using the evidence to identify management questions worth testing with actual internal workforce data.
