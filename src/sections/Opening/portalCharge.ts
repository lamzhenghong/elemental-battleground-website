export const PORTAL_HOLD_MS = 1300;

export type PortalChargeStage = 'idle' | 'stage-one' | 'stage-two' | 'stage-three' | 'activated';

export function clampPortalCharge(value: number) {
  return Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));
}

export function calculatePortalCharge(elapsedMs: number, holdMs = PORTAL_HOLD_MS) {
  if (holdMs <= 0) return 100;
  return clampPortalCharge((Math.max(0, elapsedMs) / holdMs) * 100);
}

export function getPortalChargeStage(charge: number): PortalChargeStage {
  const clamped = clampPortalCharge(charge);
  if (clamped >= 100) return 'activated';
  if (clamped >= 70) return 'stage-three';
  if (clamped >= 30) return 'stage-two';
  if (clamped > 0) return 'stage-one';
  return 'idle';
}
