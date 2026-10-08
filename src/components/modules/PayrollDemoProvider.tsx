"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { EMPLOYEES, Employee, RequestId } from "@/lib/data";
import { computePayroll, PayrollResult } from "@/lib/payroll";

interface DemoContextType {
  employeeId: "bagas" | "fajar";
  employee: Employee;
  lemburJam: number;
  unpaidHari: number;
  cutiTahunanTerpakai: number;
  reimbursement: boolean;
  requests: Record<RequestId, "pending" | "approved" | "rejected">;
  payrollResult: PayrollResult;
  statusMessage: string;
  setEmployeeId: (id: "bagas" | "fajar") => void;
  setReimbursement: (val: boolean) => void;
  approveRequest: (id: RequestId) => void;
  rejectRequest: (id: RequestId) => void;
  resetDemo: () => void;
}

const initialRequests: Record<RequestId, "pending" | "approved" | "rejected"> = {
  "req-cuti": "pending",
  "req-sakit": "pending",
  "req-unpaid": "pending",
  "req-lembur": "pending",
};

const DemoContext = createContext<DemoContextType | null>(null);

export function PayrollDemoProvider({ children }: { children: React.ReactNode }) {
  const [employeeId, setEmployeeIdState] = useState<"bagas" | "fajar">("bagas");
  const [lemburJam, setLemburJam] = useState(EMPLOYEES.bagas.lemburDefault);
  const [unpaidHari, setUnpaidHari] = useState(0);
  const [cutiTahunanTerpakai, setCutiTahunanTerpakai] = useState(0);
  const [reimbursement, setReimbursement] = useState(false);
  const [requests, setRequests] = useState<Record<RequestId, "pending" | "approved" | "rejected">>(
    initialRequests
  );
  const [statusMessage, setStatusMessage] = useState("Demo penggajian siap");

  const employee = EMPLOYEES[employeeId];

  const setEmployeeId = (id: "bagas" | "fajar") => {
    setEmployeeIdState(id);
    setLemburJam(EMPLOYEES[id].lemburDefault);
    setUnpaidHari(0);
    setCutiTahunanTerpakai(0);
    setReimbursement(false);
    setRequests(initialRequests);
    setStatusMessage(`Data dimuat untuk ${EMPLOYEES[id].nama}`);
  };

  const approveRequest = (id: RequestId) => {
    if (requests[id] !== "pending") return;

    setRequests((prev) => ({ ...prev, [id]: "approved" }));

    if (id === "req-cuti") {
      setCutiTahunanTerpakai((prev) => prev + 2);
      setStatusMessage("Cuti tahunan 2 hari disetujui (berbayar, tidak memotong gaji)");
    } else if (id === "req-sakit") {
      setStatusMessage("Izin sakit 1 hari disetujui (berbayar, surat dokter terlampir)");
    } else if (id === "req-unpaid") {
      setUnpaidHari((prev) => prev + 1);
      setStatusMessage("Cuti tidak dibayar 1 hari disetujui (potongan otomatis masuk slip gaji)");
    } else if (id === "req-lembur") {
      setLemburJam((prev) => prev + 2);
      setStatusMessage("Lembur 2 jam disetujui (otomatis menambah rekap absensi & upah lembur)");
    }
  };

  const rejectRequest = (id: RequestId) => {
    if (requests[id] !== "pending") return;
    setRequests((prev) => ({ ...prev, [id]: "rejected" }));
    setStatusMessage("Permintaan izin/lembur ditolak (tidak ada perubahan pada slip gaji)");
  };

  const resetDemo = () => {
    setLemburJam(employee.lemburDefault);
    setUnpaidHari(0);
    setCutiTahunanTerpakai(0);
    setReimbursement(false);
    setRequests(initialRequests);
    setStatusMessage("Demo penggajian direset ke konfigurasi awal");
  };

  const payrollResult = useMemo(() => {
    return computePayroll({
      pokok: employee.pokok,
      tunjanganTetap: employee.tunjanganTetap,
      tarifLembur: employee.tarifLembur,
      lemburJam,
      unpaidHari,
      reimbursement,
    });
  }, [employee, lemburJam, unpaidHari, reimbursement]);

  return (
    <DemoContext.Provider
      value={{
        employeeId,
        employee,
        lemburJam,
        unpaidHari,
        cutiTahunanTerpakai,
        reimbursement,
        requests,
        payrollResult,
        statusMessage,
        setEmployeeId,
        setReimbursement,
        approveRequest,
        rejectRequest,
        resetDemo,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function usePayrollDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) {
    throw new Error("usePayrollDemo must be used within PayrollDemoProvider");
  }
  return ctx;
}
