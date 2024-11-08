@RestController
@RequestMapping("/api")
public class BillingController {
    @PostMapping("/confirm")
    public Map<String, Double> confirm(@RequestBody Map<String, String> payload) {
        double billing = 200.0; // Mock billing calculation
        return Map.of("billing", billing);
    }
}
