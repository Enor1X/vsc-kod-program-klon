
        const sections = [
            {
                title: "1. Základní osobní údaje (1–20)",
                count: 20,
                generator: (i) => {
                    if (i === 1) return { label: "Celé jméno za svobodna", type: "text", placeholder: "např. Jan" };
                    if (i === 2) return { label: "Přezdívka z dětství", type: "text", placeholder: "např. Rychlonožka" };
                    if (i === 3) return { label: "Přesná hmotnost (v gramech)", type: "number", placeholder: "75000" };
                    if (i === 4) return { label: "Výška v milimetrech", type: "number", placeholder: "1800" };
                    if (i === 5) return { label: "Krevní skupina", type: "select", options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "0+", "0-", "Nevím, bojím se jehel"] };
                    if (i === 6) return { label: "Počet mateřských znamének", type: "number", placeholder: "0" };
                    if (i === 7) return { label: "Oblíbená barva (přesný HEX kód)", type: "color" };
                    if (i === 8) return { label: "Datum prvního vypadlého zubu", type: "date" };
                    if (i === 9) return { label: "Přesný čas, kdy se ráno budíte", type: "time" };
                    if (i === 10) return { label: "Telefonní číslo na prarodiče", type: "tel", placeholder: "+420..." };
                    if (i === 11) return { label: "Rodné číslo (fiktivní)", type: "text", placeholder: "YYMMDD/XXXX" };
                    if (i === 12) return { label: "Počet sourozenců", type: "number", placeholder: "0" };
                    if (i === 13) return { label: "Velikost bot (EU)", type: "number", placeholder: "42" };
                    if (i === 14) return { label: "Barva očí", type: "select", options: ["Modrá", "Hnědá", "Zelená", "Šedá", "Heterochromie (každé oko jiné)"] };
                    if (i === 15) return { label: "Dominantní ruka", type: "radio", options: ["Pravák", "Levák", "Ambidekter (obě)"] };
                    return { label: `Osobní detail č. ${i}`, type: "text", placeholder: "Doplňte cokoli" };
                }
            },
            {
                title: "2. Digitální život a technologie (21–50)",
                count: 30,
                generator: (i) => {
                    const id = i + 20;
                    if (id === 21) return { label: "První heslo, které jste kdy použili", type: "password", placeholder: "Pšššt" };
                    if (id === 22) return { label: "Průměrný čas na mobilu (hodiny/den)", type: "range", min: 0, max: 24 };
                    if (id === 23) return { label: "Oblíbený operační systém", type: "select", options: ["Windows", "macOS", "Linux", "Android", "iOS", "MS-DOS"] };
                    if (id === 24) return { label: "Počet nepřečtených e-mailů", type: "number", placeholder: "999+" };
                    if (id === 25) return { label: "Nahrajte fotku vaší plochy (desktopu)", type: "file" };
                    if (id === 26) return { label: "Používáte tmavý režim (Dark Mode)?", type: "checkbox", checkboxLabel: "Ano, světlo mě pálí do očí" };
                    return { label: `Název vaší oblíbené aplikace č. ${id - 26}`, type: "text", placeholder: "Instagram, TikTok..." };
                }
            },
            {
                title: "3. Jídlo, životní styl a absurdní preference (51–100)",
                count: 50,
                generator: (i) => {
                    const id = i + 50;
                    if (id === 51) return { label: "Patří ananas na pizzu?", type: "radio", options: ["Ano, je to delikatesa", "Ne, to je zločin proti lidskosti", "Pouze ve středu"] };
                    if (id === 52) return { label: "Kolik šálků kávy vypijete za den?", type: "number", placeholder: "0" };
                    if (id === 53) return { label: "Úroveň tolerance pálivého jídla", type: "range", min: 1, max: 10 };
                    if (id === 54) return { label: "Nejdivnější věc, kterou jste kdy snědli", type: "text", placeholder: "např. hmyz" };
                    if (id === 55) return { label: "Jak moc prokrastinujete při práci?", type: "range", min: 0, max: 100 };
                    return { label: `Otázka na životní styl č. ${id} (Váš názor na věc X)`, type: "text", placeholder: "Napište slovo..." };
                }
            },
            {
                title: "4. Znalosti, kvízy a filosofie (101–140)",
                count: 40,
                generator: (i) => {
                    const id = i + 100;
                    if (id === 101) return { label: "Kolik je 2 + 2 * 2?", type: "number", placeholder: "Pozor na přednost matiky!" };
                    if (id === 102) return { label: "Jak se nazývá hlavní město Španělska?", type: "text", placeholder: "Napište město" };
                    if (id === 103) return { label: "Co je to algoritmus?", type: "textarea", placeholder: "Krátká odpověď" };
                    if (id === 104) return { label: "Která planeta je známá jako Rudá planeta?", type: "text", placeholder: "Název planety" };
                    if (id === 105) return { label: "Máte rádi filozofii?", type: "radio", options: ["Ano", "Ne", "Jsem v tom zmatený"] };
                    return { label: `Otázka č. ${id} z kategorie znalosti`, type: "text", placeholder: "Doplňte odpověď" };
                }
            }
        ];

        document.addEventListener("DOMContentLoaded", () => {
            const form = document.getElementById("megaForm");
            const progressText = document.getElementById("progressText");
            const totalQuestions = sections.reduce((sum, section) => sum + section.count, 0);
            let currentNumber = 1;

            progressText.textContent = `Celkem otázek k vyplnění: ${totalQuestions} / ${totalQuestions}`;

            sections.forEach((section) => {
                const sectionWrap = document.createElement("fieldset");
                sectionWrap.className = "question-section";

                const legend = document.createElement("legend");
                legend.textContent = section.title;
                sectionWrap.appendChild(legend);

                for (let i = 1; i <= section.count; i++) {
                    const config = section.generator(i) || { label: `Otázka ${currentNumber}`, type: "text" };
                    const group = document.createElement("div");
                    group.className = "form-group";

                    const label = document.createElement("label");
                    label.textContent = `${currentNumber}. ${config.label}`;
                    group.appendChild(label);

                    if (config.type === "select") {
                        const select = document.createElement("select");
                        const placeholderOption = document.createElement("option");
                        placeholderOption.value = "";
                        placeholderOption.textContent = "Vyberte možnost";
                        placeholderOption.disabled = true;
                        placeholderOption.selected = true;
                        select.appendChild(placeholderOption);
                        config.options.forEach((option) => {
                            const optionEl = document.createElement("option");
                            optionEl.value = option;
                            optionEl.textContent = option;
                            select.appendChild(optionEl);
                        });
                        group.appendChild(select);
                    } else if (config.type === "radio") {
                        const radioGroup = document.createElement("div");
                        radioGroup.className = "radio-group";
                        config.options.forEach((option) => {
                            const optionWrap = document.createElement("label");
                            optionWrap.className = "radio-label";
                            const radio = document.createElement("input");
                            radio.type = "radio";
                            radio.name = `question-${currentNumber}`;
                            radio.value = option;
                            const text = document.createElement("span");
                            text.textContent = option;
                            optionWrap.appendChild(radio);
                            optionWrap.appendChild(text);
                            radioGroup.appendChild(optionWrap);
                        });
                        group.appendChild(radioGroup);
                    } else if (config.type === "checkbox") {
                        const checkboxWrap = document.createElement("label");
                        checkboxWrap.className = "checkbox-label";
                        const checkbox = document.createElement("input");
                        checkbox.type = "checkbox";
                        checkbox.name = `question-${currentNumber}`;
                        const text = document.createElement("span");
                        text.textContent = config.checkboxLabel || "Ano";
                        checkboxWrap.appendChild(checkbox);
                        checkboxWrap.appendChild(text);
                        group.appendChild(checkboxWrap);
                    } else if (config.type === "textarea") {
                        const textarea = document.createElement("textarea");
                        textarea.name = `question-${currentNumber}`;
                        textarea.placeholder = config.placeholder || "";
                        textarea.rows = 4;
                        group.appendChild(textarea);
                    } else if (config.type === "range") {
                        const range = document.createElement("input");
                        range.type = "range";
                        range.name = `question-${currentNumber}`;
                        range.min = config.min ?? 0;
                        range.max = config.max ?? 10;
                        range.value = Math.floor((range.min + range.max) / 2);
                        const valueText = document.createElement("div");
                        valueText.className = "range-value";
                        valueText.textContent = range.value;
                        range.addEventListener("input", () => {
                            valueText.textContent = range.value;
                        });
                        group.appendChild(range);
                        group.appendChild(valueText);
                    } else {
                        const input = document.createElement("input");
                        input.type = config.type || "text";
                        input.name = `question-${currentNumber}`;
                        input.placeholder = config.placeholder || "";
                        if (config.type === "number") input.min = "0";
                        if (config.type === "color") input.value = "#4a90e2";
                        group.appendChild(input);
                    }

                    sectionWrap.appendChild(group);
                    currentNumber += 1;
                }

                form.appendChild(sectionWrap);
            });

            const submitButton = document.createElement("button");
            submitButton.type = "submit";
            submitButton.className = "submit-btn";
            submitButton.textContent = "Odeslat dotazník";
            form.appendChild(submitButton);

            form.addEventListener("submit", (event) => {
                event.preventDefault();
                alert("Gratulujeme! Přežili jste 150 otázek.");
            });
        });
    