// Claude · showcase film: mux a silent H.264 MP4 and a WAV narration track into one MP4 (AAC audio) with AVFoundation.
// Usage: swift Tools/mux_av.swift <video.mp4> <audio.wav> <out.mp4>
import AVFoundation
import Foundation

let args = CommandLine.arguments
guard args.count == 4 else { print("usage: mux_av.swift video audio out"); exit(2) }
let video = AVURLAsset(url: URL(fileURLWithPath: args[1]))
let audio = AVURLAsset(url: URL(fileURLWithPath: args[2]))
let out = URL(fileURLWithPath: args[3])
try? FileManager.default.removeItem(at: out)

let comp = AVMutableComposition()
let sem = DispatchSemaphore(value: 0)
Task {
    do {
        let vTrack = try await video.loadTracks(withMediaType: .video).first!
        let aTrack = try await audio.loadTracks(withMediaType: .audio).first!
        let vDur = try await video.load(.duration)
        let aDur = try await audio.load(.duration)
        let cv = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
        try cv.insertTimeRange(CMTimeRange(start: .zero, duration: vDur), of: vTrack, at: .zero)
        let ca = comp.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid)!
        try ca.insertTimeRange(CMTimeRange(start: .zero, duration: CMTimeMinimum(aDur, vDur)), of: aTrack, at: .zero)
        guard let export = AVAssetExportSession(asset: comp, presetName: AVAssetExportPresetHighestQuality) else {
            print("no export session"); exit(1)
        }
        try await export.export(to: out, as: .mp4)
        print("MUX OK \(out.path)")
    } catch {
        print("MUX FAILED \(error)"); exit(1)
    }
    sem.signal()
}
sem.wait()
