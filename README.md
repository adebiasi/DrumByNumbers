# DrumByNumbers

This project is a sample-based drum sequencer driven by rhythmic patterns generated from textual input. It allows creating and playing custom rhythmic sequences using multiple encoding methods such as Euclidean rhythms, interval sequences, weighted distributions, and binary patterns. Supports multiple patterns and different sound sets with interactive keyboard controls.

![https://github.com/adebiasi/DrumByNumbers/blob/main/screenshots/Drum.png](https://github.com/adebiasi/DrumByNumbers/blob/main/screenshots/Drum.png)

## How to Use

1. **Initial Setup:** Run the project (ensure `sounds` folder contains samples organized by sound sets).
2. **Input Pattern:** Type the desired pattern text in real time (see **Detailed Description of Pattern Types** section for supported formats).
3. **Press Enter:** To process the input and generate audio patterns.
4. **Navigate Patterns:**  
   - Up/Down Arrow: Switch active pattern.  
   - Shift + Ctrl + Up/Down Arrow: Swap selected patterns.  
5. **Adjust Speed:**  
   - Left Arrow: Slow down playback.  
   - Right Arrow: Speed up playback.  
6. **Change Sound Set:** Press Spacebar.  
7. **Edit Input:** Use Backspace to delete the current input text.

---

## Detailed Description of Pattern Types

### Interval Sequences

Define the spacing between hits using numbers separated by dots.  
**Example:** `1.5.2`  
**Result:** A pattern where the first hit is immediate, then a 5-step pause, then another hit after 2 steps.  
**Visual:** `[x . . . . x . x]`  
Where `x` is a hit (1) and `.` is a rest (0).



### Euclidean Rhythm

Distributes pulses as evenly as possible across total steps.  
**Format:** `pulses,steps`  
**Example:** `5,13`  
**Result:** A 13-step pattern with 5 evenly distributed hits.  
**Visual:** `[x . . x . x . . x . x . .]`

This method is based on the algorithm described in the paper *"The Euclidean Algorithm Generates Traditional Musical Rhythms"* by Godfried Toussaint, which demonstrates how the Euclidean algorithm can be used to create many traditional and common rhythmic patterns found in world music.


### Cross-beat Rhythms

Combine multiple Euclidean rhythms with a common number of steps, calculated as the Least Common Multiple (LCM) of the individual step counts.  
**Format:** Numbers separated by colons `:`  
**Example:** `3:4`  
**Result:** Two Euclidean rhythms: 3 pulses in 12 steps and 4 pulses in 12 steps (12 is the LCM of 3 and 4).  
- Rhythm 1 (3,12): `[x . . . x . . . x . . .]`  
- Rhythm 2 (4,12): `[x . . x . . x . . x . .]`

---
### Weighted Distribution

Generate a pattern with a specified number of hits distributed probabilistically based on intensity weights assigned to each step. The distribution pattern is based on the sequence:
`['M', 'M', 'H', 'L', 'H', 'M', 'M', 'H', 'M', 'M', 'L', 'H', 'M', 'M', 'H', 'M']`

This pattern is taken from the book *THE RHYTHM CODE* by Tamas Bodzsar.

Each intensity level corresponds to a hit probability as follows:

- **L (Low):** 0.1  
- **M (Medium):** 0.4  
- **H (High):** 0.8  

The method uses these probabilities to distribute the specified number of hits (`mX`, where X is the number of hits) across the 16-step sequence, generating a weighted random pattern with emphasis on higher intensity steps.


**Format:** `mX` where `X` is the number of hits to distribute.  
**Example:** `m4`  
**Result:** A 16-step pattern with 4 hits distributed according to weighted probabilities, e.g., based on the preset configuration `[M, M, H, L, H, M, M, H, M, M, L, H, M, M, H, M]`.

---
## Try it

Experience the sequencer live in your browser here:  
[https://adebiasi.github.io/DrumByNumbers/](https://adebiasi.github.io/DrumByNumbers/)

---

## Next improvements
 - [ ] Shift pattern: For example from [ x . .] to [ . . x]
 - [ ] Save patterns
