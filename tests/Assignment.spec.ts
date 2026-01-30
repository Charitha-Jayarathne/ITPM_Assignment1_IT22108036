import { test, expect } from '@playwright/test';

test.describe('ITPM Assignment 1 - Singlish to Sinhala Automation', () => {

   
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);

    await page.goto('https://www.swifttranslator.com/', {
      waitUntil: 'domcontentloaded',
    });

    const { singlishInput, sinhalaOutput } = getInputs(page);
    await expect(singlishInput).toBeVisible();
    await expect(sinhalaOutput).toBeVisible();
  });

  const getInputs = (page: any) => ({
    singlishInput: page.locator('#phonetic_input').or(page.locator('textarea[placeholder="Input Your Singlish Text Here."]')),
    sinhalaOutput: page.locator('#sinhala_output').or(page.locator('div.flex-grow.bg-slate-50')),
  });

  // 1. POSITIVE FUNCTIONAL TESTS

  const positiveTests = [
    { id: 'Pos_Fun_0001', input: 'api vathura bomu. ', expected: 'අපි වතුර බොමු.' },
    { id: 'Pos_Fun_0002', input: 'mama kade gihin aavata passe. Uyanna patan gamu. ', expected: 'මම කඩෙ ගිහින් ආවට පස්සෙ. උයන්න පටන් ගමු. ' },
    { id: 'Pos_Fun_0003', input: 'oya beheth ganna yanavanam maath ennan thaniyata.', expected: 'ඔයා බෙහෙත් ගන්න යනවනම් මාත් එන්නන් තනියට' },
    { id: 'Pos_Fun_0004', input: 'mata mahajana baeqqkuva thiyenne kohedha kiyanna puluvandha?', expected: 'මට මහජන බැංකුව තියෙන්නෙ කොහෙද කියන්න පුලුවන්ද?' },
    { id: 'Pos_Fun_0005', input: 'vahaama ohuta dhaenumdhenna.', expected: 'වහාම ඔහුට දැනුම්දෙන්න.' },
    { id: 'Pos_Fun_0006', input: 'Api anivaarenma mee tharagayen dhinanavaa.', expected: 'අපි අනිවාරෙන්ම මේ තරගයෙන් දිනනවා.' },
    { id: 'Pos_Fun_0007', input: 'Eya kIyana vidiyatanan MEe vaedEE Hariyana EkAk naee Aparadhe Apee time Eka. ', expected: 'එය කියන විඩියටනන් මේ වැඩේ හරියන එකක් නෑ අපරදෙ අපේ time එක. ' },
    { id: 'Pos_Fun_0008', input: 'Labana maase Dubai yanavaa', expected: 'ළබන මාසෙ Dubai යනවා' },
    { id: 'Pos_Fun_0009', input: 'kohomadha saepa saniipa.', expected: 'කොහොමද සැප සනීප.' },
    { id: 'Pos_Fun_0010', input: 'MAAra vadAkne unee magee phone eka train ekee amathaka velanEe. hoyaganna vidiyak naee maqq call ekak dila baluva kata hari hambela genath dhunoth kiyanan kivva matanAn hithenne aAye dhakinAvath hambena Ekak naee kiyala. Aparade parana Unata onee karana data godak thibuna ekee. Whats app call ganna epaa nIkan call ganna onEe Unoth Mage anith phone ekata Dialog nambareeta. Heta udhe Maqq Enna parAkku unoth balan inna Epa oya pqqthiyata yanna Maqq enan avulak naee idak allaganna maqq Anivaarenma enava sure', expected: 'මාර වඩක්නෙ උනේ මගේ phone එක train එකේ අමතක වෙලනේ. හොයගන්න විඩියක් නෑ මං call එකක් ඩිල බලුව කට හරි හම්බෙල ගෙනත් දුනොත් කියනන් කිව්ව මටනන් හිතෙන්නෙ අඅයෙ දකිනවත් හම්බෙන එකක් නෑ කියල. අපරඩෙ පරන උනට ඔනේ කරන data ගොඩක් තිබුන එකේ. Whats app call ගන්න එපා නිකන් call ගන්න ඔනේ උනොත් Mage අනිත් phone එකට Dialog නම්බරේට. හෙට උදෙ මං එන්න පරක්කු උනොත් බලන් ඉන්න එප ඔය පංතියට යන්න මං එනන් අවුලක් නෑ ඉඩක් අල්ලගන්න මං අනිවාරෙන්ම එනව sure' },
    { id: 'Pos_Fun_0011', input: 'Heta BMICH ekee motor show ekata yamu  ', expected: 'හෙට BMICH එකේ motor show එකට යමු  ' },
    { id: 'Pos_Fun_0012', input: 'suba aluth avurudhak veevaa!', expected: 'සුබ අලුත් අවුරුදක් වේවා!' },
    { id: 'Pos_Fun_0013', input: 'Ammata siri siraavata maru maru.', expected: 'අම්මට සිරි සිරාවට මරු මරු.' },
    { id: 'Pos_Fun_0014', input: 'Mee oraloosuva $ 655.70/= venava parissam karanna', expected: 'මේ ඔරලෝසුව $ 655.70/= වෙනව පරිස්සම් කරන්න' },
    { id: 'Pos_Fun_0015', input: 'Heta anivarayenma 3.30 p.m ta meeting ekak gamu', expected: 'හෙට අනිවරයෙන්ම 3.30 p.m ට meeting එකක් ගමු' },
    { id: 'Pos_Fun_0016', input: 'Avurudhath kittu kittu', expected: 'අවුරුදත් කිට්ටු කිට්ටු' },
    { id: 'Pos_Fun_0017', input: 'Machaqq velaava kiyanna puluvandha?', expected: 'මචං වෙලාව කියන්න පුලුවන්ද?' },
    { id: 'Pos_Fun_0018', input: 'Heta Siqqhala viBhaage.                                                                         Mama paadam karanna yanavaa', expected: 'හෙට සිංහල විභාගෙ.                                                                   මම පාඩම් කරන්න යනවා' },
    { id: 'Pos_Fun_0019', input: 'Adoo mathak karala NIC eka genna. Amathaka vena nisaa onna kivva.', expected: 'අඩෝ මතක් කරල NIC එක ගෙන්න. අමතක වෙන නිසා ඔන්න කිව්ව.' },
    { id: 'Pos_Fun_0020', input: 'novembar 25 oyaage upan dhinee needa?', expected: 'නොවෙම්බර් 25 ඔයාගෙ උපන් දිනේ නේඩ?' },
    { id: 'Pos_Fun_0021', input: 'palathuru geenna(midhi, aepal)', expected: 'පලතුරු ගේන්න(මිදි, ඇපල්)' },
    { id: 'Pos_Fun_0022', input: 'Mata parippu 1kg dhenna', expected: 'මට පරිප්පු 1kg දෙන්න' },
    { id: 'Pos_Fun_0023', input: 'Menna meheta varen.', expected: 'මෙන්න මෙහෙට වරෙන්.' },
    { id: 'Pos_Fun_0024', input: 'mahanuvara yanu shrii lQQkaavee sQQskRUthika aganagaraya lesa saelakena ithaamath sundhara haa aithihaasika vatinaakamakin yuth nagarayaki. kaDHAu vaLallakin vatavii aethi mema puravarayehi maDhYAyee pihiti dhaLadhaa maaLigaava muLu mahath baudhDha lookayaageema gauravayata paathra vee. nagaraya maedha aethi nisala nuvara vaeva saha ee avata aethi haritha varNa parisaraya nitharama sQQchaarakayangee neth sith aedhagannaa suLuya. miita amatharava peeraadheNiya udhBhidha udhYaanaya saha bahiravakandha budhu piLimaya vaeni sThaana nisaa mahanuvarata laebennee suvisheeShii alQQkaarayaki. saeema vasarakama paevaethvena aesaLa perahaera mQQgalYAya merata aBhimaanaya lovatama vidhahaa dhakvana praDhaanathama sQQskRUthika uthsavayayi. sisil dheeshaguNaya saha gaemi siriyaava mishra vuu nuvara parisaraya oonaeema ayekugee manasata mahath sahanayak gena dhenu labana athara, eya looka uruma nagarayak lesadha yuneskoova magin nam kara aetha.\n\n', expected: 'මහනුවර යනු ශ්‍රී ලංකාවේ සංස්කෘතික අගනගරය ලෙස සැලකෙන ඉතාමත් සුන්දර හා ඓතිහාසික වටිනාකමකින් යුත් නගරයකි.' }
  ];

  for (const data of positiveTests) {
    test(`${data.id}: Testing input "${data.input.substring(0, 15)}..."`, async ({ page }) => {
      const { singlishInput, sinhalaOutput } = getInputs(page);

      await singlishInput.fill(''); // Clear previous input
      
      // Use pressSequentially to simulate real user typing behavior
      await singlishInput.pressSequentially(data.input, { delay: 10 }); 
      
      // Wait for the output to settle
      await page.waitForTimeout(1000); 

      // Assertion logic:
      if(data.input.length > 50) {
           await expect(sinhalaOutput).toContainText(data.expected.substring(0, 50));
      } else {
           await expect(sinhalaOutput).toHaveText(data.expected.trim());
      }
    });
  }

  
  // 2. NEGATIVE FUNCTIONAL TESTS


  const negativeTests = [
    { id: 'Neg_Fun_0001', input: 'Waasanawewaa', expected: 'Wඅසනwඑwආ' },
    { id: 'Neg_Fun_0002', input: 'Varadhak karath sithakin noVe', expected: 'Vඅරදක් කරත් සිතකින් නොVඑ' },
    { id: 'Neg_Fun_0003', input: 'Iphone, Shangrila,Ryzen', expected: 'ඉප්හොනෙ, ෂන්ග්\u200dරිල,Rයzඑන්' },
    { id: 'Neg_Fun_0004', input: 'https://www.sliit.lk/', expected: 'හ්ට්ට්ප්ස්://www.ස්ලීට්.ල්ක්/' },
    { id: 'Neg_Fun_0005', input: 'oyaa aBhyaasa tika karaadha?', expected: 'ඔයා අභ්යාස ටික කරාද?' },
    { id: 'Neg_Fun_0006', input: 'iita passe Ctrl + C press karanna.', expected: 'ඊට පස්සෙ Cට්\u200dරල් + C press කරන්න.' },
    { id: 'Neg_Fun_0007', input: 'x + y = 25, meeka sulu karanna', expected: 'x + ය් = 25, මේක සුලු කරන්න' },
    { id: 'Neg_Fun_0008', input: '"npx create-react-app my-app" terminal ekee run karalaa project eka hadhaaganna.', expected: '"න්පx create-react-app my-app" terminal එකේ run කරලා project එක හදාගන්න.' },
    { id: 'Neg_Fun_0009', input: 'Australia vs australia', expected: 'Australia vs ඖස්ට්\u200dරලිඅ' },
    { id: 'Neg_Fun_0010', input: 'apee maamaA inne rata.', expected: 'අපේ මාමඅ ඉන්නේ රට.' }
  ];

  for (const data of negativeTests) {
    test(`${data.id} (Negative): ${data.input}`, async ({ page }) => {
      const { singlishInput, sinhalaOutput } = getInputs(page);

      await singlishInput.fill('');
      await singlishInput.pressSequentially(data.input, { delay: 10 });
      
      await expect(sinhalaOutput).toContainText(data.expected.substring(0, 20));
    });
  }

   // POSITIVE UI TEST

  test('Pos_UI_0001: Real-time update while typing', async ({ page }) => {
    const { singlishInput, sinhalaOutput } = getInputs(page);

    
    await singlishInput.fill('');

    await singlishInput.pressSequentially('a', { delay: 200 });
    // Verify intermediate state if possible, or just proceed to simulate typing flow
    
    // 3. Type 'ammaa' to complete "ammaa"
    await singlishInput.pressSequentially('mmaa', { delay: 200 });
    
    await expect(sinhalaOutput).toHaveText('අම්මා');
    
  });

});