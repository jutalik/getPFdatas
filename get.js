import Caver from 'caver-js';
import axios from 'axios';
import xlsx from 'xlsx';

const caver = new Caver('ennode');

const nftAddress = '0x0ed55aee0399064cfe51dd3cc10d99734bb796c7'
const PF = new caver.kct.kip17(nftAddress)


const get = async () => {
    const endId = 12800
    
    let tokenList = [];
    let count = 0;
    for (let i = 1; i <= endId; i++) {

        try{
            const tokenURI = await PF.tokenURI(i)
            // console.log(`${i}번 : ${tokenURI}`)
            const res = await axios.get(tokenURI)
            const { data } = res
            const { attributes } = data
            const { trait_type, value } = attributes[attributes.length-1]
            
            
            tokenList.push({id: i, tokenURI: tokenURI, class: value.replace(/[^a-z|A-Z]/g,'')})
            
            
        }catch{
            continue;
        }


    }


    
    const workbook = xlsx.utils.book_new();
    workbook.SheetNames.push('Sheet1');
    const worksheet = xlsx.utils.json_to_sheet(tokenList)
    workbook.Sheets['Sheet1'] = worksheet;
    xlsx.writeFile(workbook, 'test.xlsx')
    
}


get()