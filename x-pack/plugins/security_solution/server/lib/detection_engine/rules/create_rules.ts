/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { normalizeThresholdObject } from '../../../../common/detection_engine/utils';
import { transformRuleToAlertAction } from '../../../../common/detection_engine/transform_actions';
import { SanitizedAlert } from '../../../../../alerting/common';
import { SERVER_APP_ID, SIGNALS_ID } from '../../../../common/constants';
import { CreateRulesOptions } from './types';
import { addTags } from './add_tags';
import { PartialFilter, RuleTypeParams } from '../types';

export const createRules = async ({
  alertsClient,
  anomalyThreshold,
  author,
  buildingBlockType,
  description,
  enabled,
  eventCategoryOverride,
  falsePositives,
  from,
  query,
  language,
  license,
  savedId,
  timelineId,
  timelineTitle,
  meta,
  machineLearningJobId,
  filters,
  ruleId,
  immutable,
  index,
  interval,
  maxSignals,
  riskScore,
  riskScoreMapping,
  ruleNameOverride,
  outputIndex,
  name,
  severity,
  severityMapping,
  tags,
  threat,
  threatFilters,
  threatIndex,
  threatIndicatorPath,
  threatLanguage,
  concurrentSearches,
  itemsPerSearch,
  threatQuery,
  threatMapping,
  threshold,
  timestampOverride,
  to,
  type,
  references,
  note,
  version,
  exceptionsList,
  actions,
}: CreateRulesOptions): Promise<SanitizedAlert<RuleTypeParams>> => {
  return alertsClient.create<RuleTypeParams>({
    data: {
      name,
      tags: addTags(tags, ruleId, immutable),
      alertTypeId: SIGNALS_ID,
      consumer: SERVER_APP_ID,
      params: {
        anomalyThreshold,
        author,
        buildingBlockType,
        description,
        ruleId,
        index,
        eventCategoryOverride,
        falsePositives,
        from,
        immutable,
        query,
        language,
        license,
        outputIndex,
        savedId,
        timelineId,
        timelineTitle,
        meta,
        machineLearningJobId,
        filters,
        maxSignals,
        riskScore,
        riskScoreMapping,
        ruleNameOverride,
        severity,
        severityMapping,
        threat,
        threshold: threshold ? normalizeThresholdObject(threshold) : undefined,
        /**
         * TODO: Fix typing inconsistancy between `RuleTypeParams` and `CreateRulesOptions`
         */
        threatFilters: threatFilters as PartialFilter[] | undefined,
        threatIndex,
        threatIndicatorPath,
        threatQuery,
        concurrentSearches,
        itemsPerSearch,
        threatMapping,
        threatLanguage,
        timestampOverride,
        to,
        type,
        references,
        note,
        version,
        exceptionsList,
      },
      schedule: { interval },
      enabled,
      actions: actions.map(transformRuleToAlertAction),
      throttle: null,
      notifyWhen: null,
    },
  });
};
