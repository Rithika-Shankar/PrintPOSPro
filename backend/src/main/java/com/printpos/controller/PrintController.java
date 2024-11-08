@RestController
@RequestMapping("/api")
public class PrintController {
    @PostMapping("/print")
    public ResponseEntity<String> printPrescription(@RequestBody Map<String, Object> data) {
        // Call printer service here
        return ResponseEntity.ok("Printed successfully");
    }
}
