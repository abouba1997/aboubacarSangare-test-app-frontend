"use client";

import type React from "react";

import type { Level, Program } from "@/lib/api";
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
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface LevelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  level: Level | null;
  programs: Program[];
  onSave: (data: Partial<Level>) => void;
}

export function LevelDialog({
  open,
  onOpenChange,
  level,
  programs,
  onSave,
}: LevelDialogProps) {
  const [formData, setFormData] = useState<Partial<Level>>({
    name: "",
    acronym: "",
    index: 0,
    programs: [],
  });

  useEffect(() => {
    if (level) {
      setFormData({
        name: level.name,
        acronym: level.acronym,
        index: level.index,
        programs: level.programs || [],
      });
    } else {
      setFormData({
        name: "",
        acronym: "",
        index: 0,
        programs: [],
      });
    }
  }, [level]);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProgramToggle = (program: Program) => {
    setFormData((prev) => {
      const currentPrograms = prev.programs || [];
      const programExists = currentPrograms.some((p) => p.id === program.id);

      let updatedPrograms;
      if (programExists) {
        updatedPrograms = currentPrograms.filter((p) => p.id !== program.id);
      } else {
        updatedPrograms = [...currentPrograms, program];
      }

      return {
        ...prev,
        programs: updatedPrograms,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Préparer les données pour l'API
    const dataToSave = {
      ...formData,
      // Convertir les programmes en tableau d'IDs si nécessaire pour l'API
      programIds: formData.programs?.map((p) => p.id),
    };

    onSave(dataToSave);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {level ? "Modifier le niveau" : "Créer un niveau"}
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations du niveau ci-dessous.
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
              <Label htmlFor="acronym" className="text-right">
                Sigle
              </Label>
              <Input
                id="acronym"
                value={formData.acronym}
                onChange={(e) => handleChange("acronym", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="index" className="text-right">
                Index
              </Label>
              <Input
                id="index"
                type="number"
                value={formData.index}
                onChange={(e) =>
                  handleChange("index", Number.parseInt(e.target.value))
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Programmes</Label>
              <div className="col-span-3 space-y-2">
                {programs.map((program) => (
                  <div key={program.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`program-${program.id}`}
                      checked={formData.programs?.some(
                        (p) => p.id === program.id
                      )}
                      onCheckedChange={() => handleProgramToggle(program)}
                    />
                    <Label htmlFor={`program-${program.id}`}>
                      {program.name} ({program.acronym})
                    </Label>
                  </div>
                ))}
              </div>
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
