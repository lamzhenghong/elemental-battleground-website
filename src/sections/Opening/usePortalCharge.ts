import { useCallback, useEffect, useRef, useState } from 'react';
import { calculatePortalCharge, clampPortalCharge, PORTAL_HOLD_MS } from './portalCharge';

interface UsePortalChargeOptions {
  initialCharge?: number;
  holdMs?: number;
  onCharge: (charge: number) => void;
  onActivate: () => void;
}

export function usePortalCharge({
  initialCharge = 0,
  holdMs = PORTAL_HOLD_MS,
  onCharge,
  onActivate
}: UsePortalChargeOptions) {
  const [charge, setChargeState] = useState(() => clampPortalCharge(initialCharge));
  const [charging, setCharging] = useState(false);
  const chargeRef = useRef(charge);
  const chargeTimerRef = useRef<number>(0);
  const decayTimerRef = useRef<number>(0);
  const startedAtRef = useRef(0);
  const activeRef = useRef(false);
  const activatedRef = useRef(false);
  const activateRef = useRef(onActivate);
  const onChargeRef = useRef(onCharge);

  useEffect(() => {
    activateRef.current = onActivate;
    onChargeRef.current = onCharge;
  }, [onActivate, onCharge]);

  const publishCharge = useCallback((nextValue: number) => {
    const next = clampPortalCharge(nextValue);
    chargeRef.current = next;
    setChargeState(next);
    onChargeRef.current(next);
    return next;
  }, []);

  const clearChargeTimer = useCallback(() => {
    window.clearInterval(chargeTimerRef.current);
    chargeTimerRef.current = 0;
  }, []);

  const clearDecayTimer = useCallback(() => {
    window.clearInterval(decayTimerRef.current);
    decayTimerRef.current = 0;
  }, []);

  const start = useCallback(() => {
    if (activeRef.current || activatedRef.current) return;
    clearDecayTimer();
    activeRef.current = true;
    setCharging(true);
    startedAtRef.current = Date.now() - (chargeRef.current / 100) * holdMs;
    chargeTimerRef.current = window.setInterval(() => {
      const next = publishCharge(calculatePortalCharge(Date.now() - startedAtRef.current, holdMs));
      if (next < 100) return;
      activatedRef.current = true;
      activeRef.current = false;
      setCharging(false);
      clearChargeTimer();
      activateRef.current();
    }, 50);
  }, [clearChargeTimer, clearDecayTimer, holdMs, publishCharge]);

  const cancel = useCallback(() => {
    if (!activeRef.current || activatedRef.current) return;
    activeRef.current = false;
    setCharging(false);
    clearChargeTimer();
    clearDecayTimer();
    decayTimerRef.current = window.setInterval(() => {
      const next = publishCharge(chargeRef.current - 8);
      if (next > 0) return;
      clearDecayTimer();
    }, 50);
  }, [clearChargeTimer, clearDecayTimer, publishCharge]);

  useEffect(() => () => {
    clearChargeTimer();
    clearDecayTimer();
  }, [clearChargeTimer, clearDecayTimer]);

  return { charge, chargeRef, charging, start, cancel };
}
