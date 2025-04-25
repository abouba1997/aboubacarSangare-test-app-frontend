"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type Level,
  type Program,
  type Student,
  levelsApi,
  programsApi,
  studentsApi,
} from "@/lib/api";
import { StudentsTable } from "./students-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, FileDown, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [studentsRes, levelsRes, programsRes] = await Promise.all([
          studentsApi.getAll(),
          levelsApi.getAll(),
          programsApi.getAll(),
        ]);
        setStudents(studentsRes.data);
        setFilteredStudents(studentsRes.data);
        setLevels(levelsRes.data);
        setPrograms(programsRes.data);
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les données",
          variant: "destructive",
        });
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  useEffect(() => {
    // Filtrer les étudiants en fonction des critères
    let result = students;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (student) =>
          student.firstName.toLowerCase().includes(term) ||
          student.lastName.toLowerCase().includes(term) ||
          student.email.toLowerCase().includes(term)
      );
    }

    if (selectedLevel) {
      result = result.filter((student) => student.level?.id === selectedLevel);
    }

    if (selectedProgram) {
      result = result.filter(
        (student) => student.program?.id === selectedProgram
      );
    }

    setFilteredStudents(result);
  }, [searchTerm, selectedLevel, selectedProgram, students]);

  const handleExportExcel = () => {
    toast({
      title: "Export Excel",
      description: "L'export Excel a été lancé",
    });
    // Logique d'export Excel à implémenter
  };

  const handleExportPDF = () => {
    toast({
      title: "Export PDF",
      description: "L'export PDF a été lancé",
    });
    // Logique d'export PDF à implémenter
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedLevel("");
    setSelectedProgram("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Liste des Étudiants
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportExcel}>
            <FileDown className="mr-2 h-4 w-4" />
            Excel
          </Button>
          <Button variant="outline" onClick={handleExportPDF}>
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les niveaux</SelectItem>
                {levels.map((level) => (
                  <SelectItem key={level.id} value={level.id}>
                    {level.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger>
                <SelectValue placeholder="Programme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les programmes</SelectItem>
                {programs.map((program) => (
                  <SelectItem key={program.id} value={program.id}>
                    {program.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleResetFilters}>
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liste des étudiants</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentsTable students={filteredStudents} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}
