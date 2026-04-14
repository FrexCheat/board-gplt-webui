import type { StudentStanding, TeamStanding } from "@/libs/types";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx-js-style";

const thinBlackBorder: XLSX.CellStyle["border"] = {
  top: { style: "thin", color: { rgb: "000000" } },
  left: { style: "thin", color: { rgb: "000000" } },
  bottom: { style: "thin", color: { rgb: "000000" } },
  right: { style: "thin", color: { rgb: "000000" } },
};

const titleCellStyle: XLSX.CellStyle = {
  font: {
    sz: 16,
    name: "Microsoft YaHei",
    bold: true,
  },
  alignment: {
    horizontal: "center",
    vertical: "center",
  },
  fill: {
    patternType: "solid",
    fgColor: { rgb: "808080" },
  },
  border: thinBlackBorder,
};

const headerCellStyle: XLSX.CellStyle = {
  font: {
    bold: true,
    name: "Microsoft YaHei",
  },
  alignment: {
    horizontal: "center",
    vertical: "center",
  },
  fill: {
    patternType: "solid",
    fgColor: { rgb: "A6A6A6" },
  },
  border: thinBlackBorder,
};

const bodyCellStyle: XLSX.CellStyle = {
  alignment: {
    horizontal: "center",
    vertical: "center",
  },
  border: thinBlackBorder,
};

function setCellStyle(sheet: XLSX.WorkSheet, row: number, col: number, style: XLSX.CellStyle) {
  const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
  const cell = sheet[cellAddress] as XLSX.CellObject | undefined;

  if (cell) {
    cell.s = style;
    return;
  }

  sheet[cellAddress] = {
    t: "s",
    v: "",
    s: style,
  };
}

function applyStyleRange(
  sheet: XLSX.WorkSheet,
  startRow: number,
  endRow: number,
  startCol: number,
  endCol: number,
  style: XLSX.CellStyle,
) {
  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      setCellStyle(sheet, row, col, style);
    }
  }
}

export function exportStandings(stuStandings: StudentStanding[], teamStandings: TeamStanding[], fileName: string) {
  const workBook = XLSX.utils.book_new();
  const teamHeader = [
    "排名",
    "队伍名称",
    "学院",
    "班级",
    "队员1",
    "队员2",
    "队员3",
    "队员4",
    "队员5",
    "队员6",
    "队员7",
    "队员8",
    "队员9",
    "队员10",
    "基础分",
    "进阶分",
    "登顶分",
    "总分",
  ];

  const teamRows = teamStandings.map((team) => {
    const t_students = stuStandings.filter(s => s.team_id === team.id);
    const studentNames = Array.from({ length: 10 }, (_, i) => t_students[i]?.name || "");
    return [
      team.rank,
      team.name,
      team.college,
      team.class,
      ...studentNames,
      team.part1.score,
      team.part2.score,
      team.part3.score,
      team.score,
    ];
  });

  const teamSheetData = [[`${fileName} - 团队排名`], teamHeader, ...teamRows];
  const teamSheet = XLSX.utils.aoa_to_sheet(teamSheetData);
  teamSheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 17 } }];
  teamSheet["!rows"] = [{ hpt: 34 }, { hpt: 20 }];
  teamSheet["!cols"] = Array.from({ length: 18 }, (_, col) => {
    if (col === 0) {
      return { wch: 6 };
    }
    if (col === 1) {
      return { wch: 35 };
    }
    if (col === 2) {
      return { wch: 23 };
    }
    if (col === 3) {
      return { wch: 27 };
    }
    if (col >= 4 && col <= 13) {
      return { wch: 9 };
    }
    return { wch: 7 };
  });

  setCellStyle(teamSheet, 0, 0, titleCellStyle);
  applyStyleRange(teamSheet, 1, 1, 0, 17, headerCellStyle);
  applyStyleRange(teamSheet, 2, teamSheetData.length - 1, 0, 17, bodyCellStyle);
  XLSX.utils.book_append_sheet(workBook, teamSheet, "团队排名");

  const stuHeader = [
    "排名",
    "姓名",
    "学号",
    "学院",
    "班级",
    "1-1",
    "1-2",
    "1-3",
    "1-4",
    "1-5",
    "1-6",
    "1-7",
    "1-8",
    "2-1",
    "2-2",
    "2-3",
    "2-4",
    "3-1",
    "3-2",
    "3-3",
    "基础分",
    "进阶分",
    "登顶分",
    "总分",
  ];

  const stuRows = stuStandings.map(stu => [
    stu.rank,
    stu.name,
    stu.id,
    stu.college,
    stu.class,
    ...stu.problems_score.map(p => p.score),
    stu.part1.score,
    stu.part2.score,
    stu.part3.score,
    stu.score,
  ]);

  const stuSheetData = [[`${fileName} - 个人排名`], stuHeader, ...stuRows];
  const stuSheet = XLSX.utils.aoa_to_sheet(stuSheetData);
  stuSheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 23 } }];
  stuSheet["!rows"] = [{ hpt: 34 }, { hpt: 20 }];
  stuSheet["!cols"] = Array.from({ length: 24 }, (_, col) => {
    if (col === 0) {
      return { wch: 6 };
    }
    if (col === 1) {
      return { wch: 9 };
    }
    if (col === 2) {
      return { wch: 15 };
    }
    if (col === 3) {
      return { wch: 23 };
    }
    if (col === 4) {
      return { wch: 27 };
    }
    if (col >= 5 && col <= 19) {
      return { wch: 6 };
    }
    return { wch: 7 };
  });

  setCellStyle(stuSheet, 0, 0, titleCellStyle);
  applyStyleRange(stuSheet, 1, 1, 0, 23, headerCellStyle);
  applyStyleRange(stuSheet, 2, stuSheetData.length - 1, 0, 23, bodyCellStyle);
  XLSX.utils.book_append_sheet(workBook, stuSheet, "个人排名");

  const buffer = XLSX.write(workBook, {
    bookType: "xlsx",
    type: "array",
  });
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  saveAs(blob, `${fileName}.xlsx`);
}
