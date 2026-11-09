import AVFoundation
import Foundation

struct VoiceSettings: Decodable { let name: String; let rate: Double; let pitch: Double }
struct Persona: Decodable { let voice: VoiceSettings; let fallback_lines: [String] }
struct Result: Encodable {
    let role: String, requested: String, actual: String, language: String, identifier: String
    let match: Bool, rate: Double, pitch: Double, durationSeconds: Double, file: String
}

enum RecordError: Error { case noVoice, noFallback, invalidArguments, noPcm, timedOut, ioError(String) }
func clamp(_ n: Double, _ lo: Double, _ hi: Double) -> Double { min(hi, max(lo, n)) }

func record(role: String, root: URL, folder: URL) throws -> Result {
    let path = root.appendingPathComponent("Content/Data/npc/personas/\(role).json")
    let persona = try JSONDecoder().decode(Persona.self, from: Data(contentsOf: path))
    guard let text = persona.fallback_lines.first, !text.isEmpty else { throw RecordError.noFallback }
    let requested = persona.voice.name
    var candidates: [(voice: AVSpeechSynthesisVoice, exact: Bool, score: Int)] = []
    for voice in AVSpeechSynthesisVoice.speechVoices() where voice.language.hasPrefix("en") {
        let name = voice.name.lowercased(), target = requested.lowercased()
        let exact = name == target || name.hasPrefix(target + " (")
        let matchScore: Int = exact ? 1000 : 0
        let languageScore: Int = voice.language == "en-US" ? 40 : 0
        let qualityScore: Int = Int(voice.quality.rawValue) * 10
        candidates.append((voice, exact, matchScore + languageScore + qualityScore))
    }
    let sorted = candidates.sorted { a, b in
        if a.score == b.score { return a.voice.identifier < b.voice.identifier }
        return a.score > b.score
    }
    guard let chosen = sorted.first else { throw RecordError.noVoice }
    let wpm = clamp(persona.voice.rate, 80, 270), pitch = clamp(persona.voice.pitch, 0, 100)
    let rate = clamp(wpm / 360, 0.2, 0.75), multiplier = clamp(0.8 + pitch * 0.004, 0.8, 1.2)
    let utterance = AVSpeechUtterance(string: text)
    utterance.voice = AVSpeechSynthesisVoice(identifier: chosen.0.identifier)
    utterance.rate = Float(rate); utterance.pitchMultiplier = Float(multiplier); utterance.volume = 0.85
    let output = folder.appendingPathComponent("\(role).caf")
    let synthesizer = AVSpeechSynthesizer()
    let lock = NSLock()
    var file: AVAudioFile?; var frames: AVAudioFramePosition = 0; var sampleRate = 0.0
    var done = false; var callbackError: String? = nil
    synthesizer.write(utterance) { buffer in
        lock.lock(); defer { lock.unlock() }
        guard let pcm = buffer as? AVAudioPCMBuffer else { callbackError = "Non-PCM audio"; done = true; return }
        if pcm.frameLength == 0 { done = true; return }
        do {
            if file == nil { file = try AVAudioFile(forWriting: output, settings: pcm.format.settings); sampleRate = pcm.format.sampleRate }
            try file?.write(from: pcm)
            frames += AVAudioFramePosition(pcm.frameLength)
        } catch { callbackError = error.localizedDescription; done = true }
    }
    let deadline = Date().addingTimeInterval(25)
    while true {
        lock.lock(); let finished = done; lock.unlock()
        if finished { break }
        if Date() >= deadline { synthesizer.stopSpeaking(at: .immediate); throw RecordError.timedOut }
        RunLoop.current.run(until: Date().addingTimeInterval(0.05))
    }
    lock.lock(); let issue = callbackError; file = nil; let totalFrames = frames; let frequency = sampleRate; lock.unlock()
    if let issue = issue { throw RecordError.ioError(issue) }
    guard totalFrames > 0, frequency > 0 else { throw RecordError.noPcm }
    return Result(role: role, requested: requested, actual: chosen.0.name, language: chosen.0.language,
                  identifier: chosen.0.identifier, match: chosen.1, rate: rate, pitch: multiplier,
                  durationSeconds: Double(totalFrames)/frequency, file: output.path)
}

do {
    guard CommandLine.arguments.count == 2 else { throw RecordError.invalidArguments }
    let root = URL(fileURLWithPath: CommandLine.arguments[1], isDirectory: true)
    let folder = root.appendingPathComponent("Saved/Round6/voice-audition", isDirectory: true)
    try FileManager.default.createDirectory(at: folder, withIntermediateDirectories: true)
    var results: [Result] = []
    for role in ["paul", "maria", "jason", "jack"] { results.append(try record(role: role, root: root, folder: folder)) }
    let encoder = JSONEncoder(); encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
    try encoder.encode(results).write(to: folder.appendingPathComponent("manifest.json"), options: .atomic)
    print("VOICE_AUDITION_RECORDED_NON_PIE \(folder.path)")
} catch {
    fputs("VOICE_AUDITION_FAILED \(error)\n", stderr)
    exit(1)
}
