-- Gen Z workplace retention evidence review
-- Load data/source_metrics.csv into a table named source_metrics before running these queries.
-- Values stay linked to the original source, geography, population and period.

-- 1. South African youth labour-market indicators
SELECT metric, value, unit, period, source, source_url
FROM source_metrics
WHERE source_id = 'STATSSA26'
  AND metric IN (
    'Unemployment rate age 15-24',
    'Unemployment rate age 25-34',
    'NEET rate age 15-24',
    'NEET rate age 15-34'
  )
ORDER BY metric;

-- 2. South African Gen Z learning and development expectations
SELECT metric, value, unit, population, period, source, source_url
FROM source_metrics
WHERE source_id = 'DELOITTEZA25'
ORDER BY value DESC;

-- 3. Employer-reported reasons recent graduate hires did not work out
SELECT metric, value, unit, population, period, source, source_url
FROM source_metrics
WHERE source_id = 'INTEL24'
  AND metric IN (
    'Lack of motivation or initiative',
    'Lack of professionalism',
    'Poor communication skills',
    'Struggles with feedback',
    'Inadequate problem-solving abilities'
  )
ORDER BY value DESC;

-- 4. Global Gen Z career progression preferences
SELECT metric, value, unit, period, source, source_url
FROM source_metrics
WHERE source_id = 'DELOITTE26'
  AND metric IN (
    'Prefer steady progress',
    'Prefer rapid promotions',
    'Willing to move laterally or take a step back'
  )
ORDER BY value DESC;

-- 5. Manager development expectation gap
-- Both published percentages come from Deloitte Global 2025.
SELECT
  MAX(CASE WHEN metric = 'Want managers to teach and mentor them' THEN value END) AS want_teaching_mentoring,
  MAX(CASE WHEN metric = 'Say managers actually teach and mentor them' THEN value END) AS experience_teaching_mentoring,
  MAX(CASE WHEN metric = 'Want managers to teach and mentor them' THEN value END)
    - MAX(CASE WHEN metric = 'Say managers actually teach and mentor them' THEN value END) AS gap_percentage_points
FROM source_metrics
WHERE source_id = 'DELOITTE25';

-- 6. Source audit: show exactly what sits behind each numeric value
SELECT source_id, metric, value, unit, geography, population, period, source, source_url
FROM source_metrics
ORDER BY source_id, metric;
