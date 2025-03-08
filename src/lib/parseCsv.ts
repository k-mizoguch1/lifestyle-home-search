// import { Building, Home, Layout } from '@/model/home'
// import fs from 'fs/promises'
// import path from 'path'

// export async function parseCsv(): Promise<Home[]> {
//   const filePath = path.join(process.cwd(), 'public', 'data.csv')

//   try {
//     const fileContent = await fs.readFile(filePath, 'utf-8')

//     const rows = fileContent.split('\n').map((row) => row.split(','))
//     const headers = rows.shift()

//     if (!headers) {
//       return []
//     }

//     const jsonData: Home[] = rows.map((row) => {
//       return {
//         id: row[0],
//         name: row[1],
//         prefecture: row[2],
//         city: row[3],
//         rent: Number(row[4]) || 0,
//         layout: row[5] as Layout,
//         year: Number(row[6]) || 0,
//         building: row[7] as Building,
//       }
//     })

//     return jsonData
//   } catch (error) {
//     console.error('Error reading the CSV file:', error)
//     return []
//   }
// }
