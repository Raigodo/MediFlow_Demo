**Mediflow**

**Mediflow** ir klientu pārvaldības rīks, kas ļauj viegli apkopot, papildināt un atrast datus par struktūrvienību un tajā esošajiem klientiem un darbiniekiem.
Mediflow pārsvarā ir veidots centrējot jēdzienus **struktūrvienība**, **klients**, **darbinieks**, **dienas ieraksts**.

Katrā struktūrvienībā ir savs **klientu** un **darbinieku** saraksts.
Katram klientam ir savs irakstu kopums - **dienas ieraksti**, **izsniegtie medikamenti**, **veiktie mērījumi**, **klienta diagnozes** un **ātrās palīdzības izsaukumi**.
Visi šie ieraksti ir piesaistīti pie kāda dienas ieraksta, un var tikt pievienoti vai noņemti tikai caur dienas ierakstu.
Dienas ieraksts ir rediģējams tikai tā izveidošans dienas ietvaros.

Dienas ierakstu var veidot tikai drbinieks, bet skatīt var arī vadītājs un citi darbinieki

Struktūrvienībā ir savs **medikamentu** saraksts un viena medmāsa kas par tiem atbild. Tikai atbildīgā medmāsa var papildināt medikamentus.
Vadītājs var jebkuru medmāsu padarīt par atbildīgo par medikamentiem.

Lai nepieļautu nesankcionētu piekļuvi papildus tiek ieviests termins **Uzticama ierīce**. Vadītājs var jebkuru ierīci kurā ir iegājis pats padarīt par uzticamu.

Darbinieks var pieslēgties tikai no uzticamas ierīces

Vadītājs var izveidot arī **ielūgumu**, kuram tiek norādīts **ieņamamais amats**. Izmantojot šādu ielūgumu un ir iespējams no uzticamas ierīces **pieregistrēties** jauna lietotāja gadījumā vai **pievienoties**, gadījumos, kad lietotājs jau eksistē, un ieņemt uzticamajai ierīcei piesaistītajā struktūrvienībā norādīto amatu.

Vadītājus var veidot administrators

**Admins:**
username: admin@email.com 
password: P@55w0rd

**Vadītājs:**
username: manager@email.com
password: P@55w0rd

**Medmāsa:**
username: nurse@email.com
password: P@55w0rd
password: P@55w0rd

**Prerekvizīti:**
Docker
PHP
Composer
npm

**Soļi:**
1. klonēt repozitoriju:
   git clone https://github.com/Raigodo/MediFlow_Demo.git
2. kopēt .env.example failu un pārdēvēt kopiju par .env
3. instalēt php atkarības:
   composer i
4. instalēt javascript atkarības:
   npm i
6. startēt laravel sail
   ./vendor/bin/sail up
7. sagatavot datu glabātuves
   ./vendor/bin/sail artisan migrate --seed
   ./vendor/bin/sail artisan bucket:seed
