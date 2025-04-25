"use client";

import type React from "react";

import type { Program, ProgramType } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

interface ProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  program: Program | null;
  programTypes: ProgramType[];
  onSave: (data: Partial<Program>) => void;
}

export function ProgramDialog({
  open,
  onOpenChange,
  program,
  programTypes,
  onSave,
}: ProgramDialogProps) {
  const [formData, setFormData] = useState<Partial<Program>>({
    name: "",
    sigle: "",
    programType: undefined,
  });

  useEffect(() => {
    if (program) {
      setFormData({
        name: program.name,
        sigle: program.sigle,
        programType: program.programType,
      });
    } else {
      setFormData({
        name: "",
        sigle: "",
        programType: undefined,
      });
    }
  }, [program]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTypeChange = (typeId: string) => {
    console.log(programTypes);
    const selectedType = programTypes.find((type) => type.id === typeId);
    setFormData((prev) => ({
      ...prev,
      programTypeId: selectedType?.id,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {program ? "Modifier le programme" : "Créer un programme"}
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations du programme ci-dessous.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sigle" className="text-right">
                Sigle
              </Label>
              <Input
                id="sigle"
                value={formData.sigle}
                onChange={(e) => handleChange("sigle", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="programType" className="text-right">
                Type
              </Label>
              <Select
                value={formData.programType?.id}
                onValueChange={handleTypeChange}
                required
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  {programTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
