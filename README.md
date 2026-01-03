# 🚀 AR.js - Aplicație Realitate Augmentată

Aplicație web simplă și bine structurată pentru Realitate Augmentată folosind **AR.js** și **A-Frame**.

## 📋 Descriere

Această aplicație permite vizualizarea de conținut 3D augmentat folosind camera telefonului. Când markerul Hiro este detectat de cameră, se afișează un model 3D animat (T-Rex).

## ✨ Caracteristici

- ✅ **Marker Based Tracking** - Detectare stabilă folosind markerul Hiro
- ✅ **Model 3D Animated** - Model T-Rex cu animații
- ✅ **Design Modern** - Interfață utilizator frumoasă și responsive
- ✅ **Cross-platform** - Funcționează pe orice dispozitiv cu WebGL și WebRTC
- ✅ **Optimizat pentru performanță** - Rulează eficient pe telefoane

## 🛠️ Tehnologii

- **AR.js** - Bibliotecă pentru AR pe web
- **A-Frame** - Framework pentru VR/AR
- **Three.js** - Motor de randare 3D (inclus în A-Frame)
- **HTML5/CSS3/JavaScript** - Tehnologii web standard

## 📦 Instalare și Rulare

### Cerințe

- Un server web local (pentru că AR.js necesită HTTPS sau localhost)
- Un browser modern cu suport WebGL și WebRTC
- O cameră (webcam sau cameră telefon)

### Pași de instalare

1. **Clonează sau descarcă proiectul**

2. **Pornește un server web local**

   Opțiuni:
   
   **Python 3:**
   ```bash
   python -m http.server 8000
   ```
   
   **Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```
   
   **PHP:**
   ```bash
   php -S localhost:8000
   ```

3. **Deschide aplicația în browser**
   
   Accesează: `http://localhost:8000`

4. **Permite accesul la cameră**
   
   Când browserul solicită, permiteți accesul la cameră.

5. **Tipărește markerul Hiro**
   
   Descarcă și tipărește markerul Hiro de aici:
   - [Marker Hiro (PDF)](https://raw.githack.com/AR-js-org/AR.js/master/data/images/HIRO.jpg)
   - Sau caută "Hiro marker AR.js" pe Google Images

6. **Folosește aplicația**
   
   - Țineți markerul în fața camerei
   - Modelul 3D va apărea când markerul este detectat

## 📱 Utilizare pe Telefon

Pentru a testa pe telefon:

1. Asigură-te că telefonul și computerul sunt pe aceeași rețea WiFi
2. Găsește adresa IP locală a computerului:
   - Windows: `ipconfig` în Command Prompt
   - Mac/Linux: `ifconfig` în Terminal
3. Pe telefon, accesează: `http://[IP-ADRESA]:8000`
4. Permite accesul la cameră
5. Scanează markerul Hiro

## 📂 Structura Proiectului

```
proiectAR/
│
├── index.html          # Fișierul HTML principal
├── css/
│   └── style.css       # Stiluri CSS
├── js/
│   └── main.js         # Logica JavaScript
└── README.md           # Documentația proiectului
```

## 🎯 Funcționalități

### Marker Detection
- Detectare automată a markerului Hiro
- Animații când markerul este detectat
- Indicator vizual când markerul este găsit

### Interacțiuni
- Buton de informații pentru instrucțiuni
- Overlay cu instrucțiuni de utilizare
- Loading screen elegant

### Optimizări
- Lazy loading pentru modele 3D
- Performance monitoring
- Error handling pentru accesul la cameră

## 🔧 Personalizare

### Schimbarea Modelului 3D

În `index.html`, găsește linia cu `gltf-model` și înlocuiește URL-ul:

```html
<a-entity
    gltf-model="URL_MODEL_TAU_GLTF"
    ...
></a-entity>
```

### Schimbarea Markerului

Pentru a folosi un marker personalizat:

1. Generează un marker personalizat folosind [AR.js Marker Generator](https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html)
2. Înlocuiește `preset="hiro"` cu `type="pattern"` și `url="cale/catre/marker.patt"`

### Modificarea Animațiilor

În `index.html`, modifică atributele de animație:

```html
animation__rotate="property: rotation; to: 0 360 0; loop: true; dur: 10000"
```

## 🐛 Troubleshooting

### Camera nu funcționează
- Asigură-te că ai permis accesul la cameră în browser
- Verifică dacă altă aplicație folosește camera
- Reîncarcă pagina

### Markerul nu este detectat
- Asigură-te că markerul este bine iluminat
- Markerul trebuie să fie complet vizibil în cadru
- Evită reflexii și umbre pe marker
- Markerul trebuie să fie tipărit pe hârtie albă, netedă

### Modelul nu apare
- Verifică conexiunea la internet (modelul se încarcă de pe CDN)
- Verifică consola browserului pentru erori (F12)
- Asigură-te că markerul este corect detectat

## 📚 Resurse

- [AR.js Documentation](https://ar-js-org.github.io/AR.js-Docs/)
- [A-Frame Documentation](https://aframe.io/docs/)
- [AR.js GitHub](https://github.com/AR-js-org/AR.js)
- [Marker Generator](https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html)

## 📄 Licență

Acest proiect este open source și disponibil sub licență MIT.

## 👨‍💻 Dezvoltare

Pentru a contribui sau a extinde proiectul:

1. Fork repository-ul
2. Creează o branch pentru feature (`git checkout -b feature/AmazingFeature`)
3. Commit schimbările (`git commit -m 'Add some AmazingFeature'`)
4. Push la branch (`git push origin feature/AmazingFeature`)
5. Deschide un Pull Request

## 🎉 Mulțumiri

- [AR.js Team](https://github.com/AR-js-org) pentru biblioteca minunată
- [A-Frame Team](https://aframe.io/) pentru framework-ul VR/AR
- Comunitatea open source

---

**Bucură-te de experiența AR! 🚀**

