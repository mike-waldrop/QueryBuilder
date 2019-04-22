import { Engine } from "src/app/core/services/lookups/engine";
import { IoTEvent } from "src/app/core/services/lookups/iotEvent";

export class RuleDefinition {
  ruleId: string;
  matchExpression: string;
  startDtTm?: Date;
  endDtTm?: Date;
  assetType: string;
  assetId: string;
  eventType: IoTEvent | string;
  engines: (string | Engine)[];
  createDateTime?: Date;
  createdById?: string;
  manualFlag: boolean;
}
