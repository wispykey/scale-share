import { Injectable } from "@angular/core";
import { Beam, Factory } from "vexflow";
import { Measure, Phrase, ScaleFormOptions } from "../../music-theory/types";
import { createPhrase } from "../../music-theory/create-phrase";

@Injectable({
    providedIn: 'root'
})

export class ScoreRendererService {
    SCORE_WIDTH = 1400;
    // Need to reserve one pixel to render right-most barline
    ROW_WIDTH = this.SCORE_WIDTH - 1;

    // VexFlow-specific sizes. Hard-coded by observation.
    CLEF_WIDTH = 50;
    TIME_SIGNATURE_WIDTH = 40;
    NOTE_GLYPH_WIDTH = 15;
    ACCIDENTAL_GLYPH_WIDTH = 10;
    NOTE_WIDTH = this.NOTE_GLYPH_WIDTH + this.ACCIDENTAL_GLYPH_WIDTH;
    KEY_SIGNATURE_PADDING = 20;

    MINIMUM_MEASURE_WIDTH = 150;
    PHRASE_MARGIN = 150;

    INIT_X = 0;
    INIT_Y = 20;

    render(options: ScaleFormOptions) {
        let phrase = createPhrase(options);
        document.querySelector(`app-score`)!.innerHTML = '';
        this.renderScore('app-score', [phrase]);
    }

    renderScore(elementId: string, phrases: Phrase[]): void {


        const factory = new Factory({
            renderer: {
                elementId: 'app-score',
                // elementId: element as any, 
                width: 2000,
                height: 800
            }
        })

        let numRowsRendered = 0;
        phrases.forEach((phrase) => {
            numRowsRendered += this.renderPhrase(factory, 0, this.INIT_Y + numRowsRendered * this.PHRASE_MARGIN, phrase);
        });
    }


    private renderPhrase(factory: Factory, x: number, y: number, phrase: Phrase): number {
        const spaceBetweenRows = 150;
        let phraseRows = this.distributeMeasuresIntoRows(phrase.measures);

        phraseRows.forEach((row, index) => {
            this.renderRow(factory, x, y + index * spaceBetweenRows, row, phrase);
        });

        return phraseRows.length;
    }

    private distributeMeasuresIntoRows(measures: Measure[]): Measure[][] {
        // TODO: Should this be dynamic, or is it OK to assume worst-case seven sharps/flats?
        let keySignatureWidth = 7 * this.ACCIDENTAL_GLYPH_WIDTH + this.KEY_SIGNATURE_PADDING;
        const maximumWidthForNotes = this.ROW_WIDTH - this.CLEF_WIDTH - this.TIME_SIGNATURE_WIDTH - keySignatureWidth;

        if (maximumWidthForNotes < 0) {
            console.error("Remaining width for notes is less than 0");
            return [measures];
        }

        let rows: Measure[][] = [];
        let rowMeasures: Measure[] = [];
        let currRowWidth = 0;

        // Predict width of measures based on running total of note widths.
        measures.map((measure) => {
            let newMeasureWidth = measure.length * this.NOTE_WIDTH + this.MINIMUM_MEASURE_WIDTH;
            currRowWidth += newMeasureWidth;
            if (currRowWidth > maximumWidthForNotes) {
                rows.push([...rowMeasures]);
                rowMeasures = [measure];
                currRowWidth = 0 + newMeasureWidth;
            } else {
                rowMeasures.push(measure);
            }
        });

        if (rowMeasures.length > 0) {
            rows.push([...rowMeasures]);
        }

        return rows;
    }

    private renderRow(factory: Factory, x: number, y: number, measures: Measure[], phrase: Phrase): void {
        // TODO: Dynamically resize to account for measures with many notes/accidentals
        const measureWidth = (this.ROW_WIDTH) / measures.length;

        function makeStave() {
            let stave = factory.Stave({
                x: x,
                y: y,
                width: measureWidth
            });
            x += measureWidth;
            return stave;
        }

        // TODO: Restore accidentals functionality
        /*
        // Solution assumes that project will only use notes from the scale
        // i.e. if we want to allow chromatic alterations in generative melodies, this will break.
        function shouldDisplayAccidental(pitchName: PitchName): boolean {
            if (phrase.showExtraAccidentals) return true;
            if (!phrase.scaleType.includes('minor')) return phrase.showExtraAccidentals;

            // Remaining cases: scales with both 1) a key signature and 2) alterations to specific notes
            // i.e. harmonic minor and melodic minor
            const tonicASCIICode = phrase.tonic.charCodeAt(0);
            // TODO: Support scales with length that is not 7
            const scaleIndex = ((pitchName.charCodeAt(0) - tonicASCIICode) % 7 + 7) % 7;
            const scaleDegree = scaleIndex + 1;

            switch (phrase.scaleType) {
                case 'harmonic-minor':
                    return scaleDegree === 7;
                case 'melodic-minor':
                    return scaleDegree === 6 || scaleDegree === 7;
                default:
                    return false;
            }
        }
        

        function stripAccidentals(pitchName: PitchName): string {
            return pitchName.charAt(0);
        }
        */

        const score = factory.EasyScore();
        const formatter = factory.Formatter();

        // let allNotes: StemmableNote[] = [];

        measures.forEach((measure, index) => {
            const noteNameStrings = measure.map((note) => {
                // let noteName = shouldDisplayAccidental(note.name) ? note.name : stripAccidentals(note.name);
                let noteName = note.name;
                return `${noteName}${note.register}/${note.duration}${note.isRest ? '/r' : ''}`;
            });
            const measureString = noteNameStrings.join(", ");

            const stave = makeStave();
            const notes = score.notes(measureString);
            // allNotes = allNotes.concat(notes);
            const voice = score.voice(notes);

            if (index === 0) {
                stave.addTimeSignature('4/4');
                stave.addClef('treble');
                // if (phrase.showKeySignature) {
                let key = `${phrase.tonic}${phrase.scaleType.includes('minor') ? 'm' : ''}`;
                stave.addKeySignature(key);
                // }
            }

            const beams = Beam.applyAndGetBeams(voice);

            formatter.joinVoices([voice]).formatToStave([voice], stave);
            factory.draw();

            beams.forEach(b => b.setContext(factory.getContext()).draw());
        });

        // Apply articulation pattern to stream of notes (so that patterns can easily span across measures)


        /*
        let patternIndex = 0;
        let patternLength = phrase.articulationPattern.length;
        let slurFrom = null;

        for (let i = 0; i < allNotes.length; i++) {
            switch (phrase.articulationPattern[patternIndex]) {
                case 's':
                    if (slurFrom === null && !allNotes[i].isRest()) {
                        slurFrom = allNotes[i];
                    }
                    break;
                default:
                    if (slurFrom !== null && !allNotes[i - 1].isRest()) {
                        factory.Curve({ from: slurFrom, to: allNotes[i - 1], options: {} });
                        slurFrom = null;
                    }
                    break;
            }
            patternIndex = (patternIndex + 1) % patternLength;
        */

        factory.draw();
    }


}