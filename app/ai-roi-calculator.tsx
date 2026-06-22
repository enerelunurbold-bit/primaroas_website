"use client";

import { useState } from "react";
import { useI18n } from "./i18n/context";

export default function AIROICalculator() {
  const { t } = useI18n();
  const [employees, setEmployees] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [hoursPerTask, setHoursPerTask] = useState("");
  const [tasksPerWeek, setTasksPerWeek] = useState("");
  const [automationPct, setAutomationPct] = useState(50);
  const [implementationCost, setImplementationCost] = useState("");
  const [calculated, setCalculated] = useState(false);

  const weeksPerYear = 50;
  const emp = Number(employees) || 0;
  const rate = Number(hourlyRate) || 0;
  const hpt = Number(hoursPerTask) || 0;
  const tpw = Number(tasksPerWeek) || 0;
  const implCost = Number(implementationCost) || 0;

  const totalManualHoursPerYear = emp * hpt * tpw * weeksPerYear;
  const hoursSaved = Math.round(totalManualHoursPerYear * (automationPct / 100));
  const annualSavings = hoursSaved * rate;
  const netSavings = annualSavings - implCost;
  const roi = implCost > 0 ? Math.round((netSavings / implCost) * 100) : 0;

  const canCalculate = emp > 0 && rate > 0 && hpt > 0 && tpw > 0;

  const automationOptions = [
    { label: t("calculator.conservative"), value: 30 },
    { label: t("calculator.moderate"), value: 50 },
    { label: t("calculator.aggressive"), value: 70 },
    { label: t("calculator.full"), value: 90 },
  ];

  return (
    <div className="roi-calculator">
      <div className="roi-form">
        <h3 className="roi-col-title">{t("calculator.currentOps")}</h3>
        <div className="roi-row">
          <label>
            <span className="roi-label">{t("calculator.employees")}</span>
            <input
              type="number"
              min={1}
              placeholder="e.g. 10"
              value={employees}
              onChange={(e) => { setEmployees(e.target.value); setCalculated(false); }}
            />
          </label>
          <label>
            <span className="roi-label">{t("calculator.hourlyRate")}</span>
            <input
              type="number"
              min={1}
              placeholder="e.g. 25"
              value={hourlyRate}
              onChange={(e) => { setHourlyRate(e.target.value); setCalculated(false); }}
            />
          </label>
        </div>
        <div className="roi-row">
          <label>
            <span className="roi-label">{t("calculator.hoursPerTask")}</span>
            <input
              type="number"
              min={0.5}
              step={0.5}
              placeholder="e.g. 2"
              value={hoursPerTask}
              onChange={(e) => { setHoursPerTask(e.target.value); setCalculated(false); }}
            />
          </label>
          <label>
            <span className="roi-label">{t("calculator.tasksPerWeek")}</span>
            <input
              type="number"
              min={1}
              placeholder="e.g. 20"
              value={tasksPerWeek}
              onChange={(e) => { setTasksPerWeek(e.target.value); setCalculated(false); }}
            />
          </label>
        </div>
        <div className="roi-row">
          <label>
            <span className="roi-label">{t("calculator.automationPct")}</span>
            <select
              value={automationPct}
              onChange={(e) => { setAutomationPct(Number(e.target.value)); setCalculated(false); }}
            >
              {automationOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="roi-label">{t("calculator.implCost")}</span>
            <input
              type="number"
              min={0}
              placeholder="e.g. 5000"
              value={implementationCost}
              onChange={(e) => { setImplementationCost(e.target.value); setCalculated(false); }}
            />
          </label>
        </div>
      </div>

      {calculated && canCalculate ? (
        <div className="roi-results">
          <h3 className="roi-col-title">{t("calculator.roiAnalysis")}</h3>
          <div className="roi-results-grid">
            <div className="roi-result-card">
              <span className="roi-result-value">{hoursSaved.toLocaleString()}</span>
              <span className="roi-result-label">{t("calculator.hoursSaved")}</span>
            </div>
            <div className="roi-result-card">
              <span className="roi-result-value">${annualSavings.toLocaleString()}</span>
              <span className="roi-result-label">{t("calculator.annualSavings")}</span>
            </div>
            <div className="roi-result-card">
              <span className="roi-result-value">${netSavings.toLocaleString()}</span>
              <span className="roi-result-label">{t("calculator.netSavings")}</span>
            </div>
            <div className="roi-result-card roi-result-card--highlight">
              <span className="roi-result-value">{roi}%</span>
              <span className="roi-result-label">{t("calculator.estimatedRoi")}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="roi-placeholder">
          <p>{t("calculator.placeholder")}</p>
        </div>
      )}

      <button
        className="roi-button"
        disabled={!canCalculate}
        onClick={() => setCalculated(true)}
      >
        {t("calculator.button")}
      </button>
    </div>
  );
}
