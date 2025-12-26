import type { StudentStanding, TeamStanding } from "@/libs/types";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export function exportStandings(stuStandings: StudentStanding[], teamStandings: TeamStanding[], fileName: string) {
  const workBook = new ExcelJS.Workbook();
  const teamSheet = workBook.addWorksheet("团队排名");
  const stuSheet = workBook.addWorksheet("个人排名");

  (() => {
    const titleRow = teamSheet.addRow([`${fileName} - 团队排名`]);
    teamSheet.mergeCells("A1:R1");
    titleRow.height = 34;
    const titleCell = titleRow.getCell(1);
    titleCell.font = {
      size: 16,
      name: "Microsoft YaHei",
      bold: true,
    };
    titleCell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    titleCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "808080" },
    };
    titleCell.border = {
      top: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    };

    const headerRow = teamSheet.addRow([
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
    ]);

    headerRow.height = 20;
    headerRow.alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    headerRow.font = {
      bold: true,
      name: "Microsoft YaHei",
    };
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "A6A6A6" },
      };
      cell.border = {
        top: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
    });

    teamStandings.forEach((team) => {
      const t_students = stuStandings.filter(s => s.team_id === team.id);
      const studentNames = Array.from({ length: 10 }, (_, i) => t_students[i]?.name || "");
      const row = teamSheet.addRow([
        team.rank,
        team.name,
        team.college,
        team.class,
        ...studentNames,
        team.part1.score,
        team.part2.score,
        team.part3.score,
        team.score,
      ]);
      row.eachCell((cell) => {
        cell.alignment = {
          horizontal: "center",
          vertical: "middle",
        };
        cell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
      });
    });

    teamSheet.getColumn(1).width = 6;
    teamSheet.getColumn(2).width = 35;
    teamSheet.getColumn(3).width = 23;
    teamSheet.getColumn(4).width = 27;
    teamSheet.getColumn(15).width = 7;
    teamSheet.getColumn(16).width = 7;
    teamSheet.getColumn(17).width = 7;
    teamSheet.getColumn(18).width = 7;
    for (let col = 5; col <= 14; col++) {
      teamSheet.getColumn(col).width = 9;
    }
  })();

  (() => {
    const titleRow = stuSheet.addRow([`${fileName} - 个人排名`]);
    stuSheet.mergeCells("A1:X1");
    titleRow.height = 34;
    const titleCell = titleRow.getCell(1);
    titleCell.font = {
      size: 16,
      name: "Microsoft YaHei",
      bold: true,
    };
    titleCell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    titleCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "808080" },
    };
    titleCell.border = {
      top: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    };

    const headerRow = stuSheet.addRow([
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
    ]);

    headerRow.height = 20;
    headerRow.alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    headerRow.font = {
      bold: true,
      name: "Microsoft YaHei",
    };
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "A6A6A6" },
      };
      cell.border = {
        top: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
    });

    stuStandings.forEach((stu) => {
      const row = stuSheet.addRow([
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
      row.eachCell((cell) => {
        cell.alignment = {
          horizontal: "center",
          vertical: "middle",
        };
        cell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
      });
    });

    stuSheet.getColumn(1).width = 6;
    stuSheet.getColumn(2).width = 9;
    stuSheet.getColumn(3).width = 15;
    stuSheet.getColumn(4).width = 23;
    stuSheet.getColumn(5).width = 27;
    stuSheet.getColumn(21).width = 7;
    stuSheet.getColumn(22).width = 7;
    stuSheet.getColumn(23).width = 7;
    stuSheet.getColumn(24).width = 7;
    for (let col = 6; col <= 20; col++) {
      stuSheet.getColumn(col).width = 6;
    }
  })();

  workBook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, `${fileName}.xlsx`);
  });
}
