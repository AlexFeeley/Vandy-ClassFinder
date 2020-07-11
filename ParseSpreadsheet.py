import xlrd

book = xlrd.open_workbook('ClassConcentrations.xlsx')

major = input("Enter your major: ")
sheet = book.sheet_by_name(major)

className = input("Enter class name: ")

for i in range(sheet.ncols):
    concentrationName = sheet.cell_value(0,i)
    for j in range(sheet.nrows):
        if (sheet.cell_value(j,i) == className):
            print('distribution requirement: ' + concentrationName)