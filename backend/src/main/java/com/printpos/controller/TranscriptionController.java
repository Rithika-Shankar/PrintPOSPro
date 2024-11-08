@RestController
@RequestMapping("/api")
public class TranscriptionController {
    @Autowired
    private TranscriptionService transcriptionService;

    @GetMapping("/transcribe")
    public Map<String, String> transcribe() {
        String result = transcriptionService.transcribeSpeech();
        return Map.of("transcription", result);
    }
}
