import requests
import sys
import json
from datetime import datetime

class LazyGenAPITester:
    def __init__(self, base_url="https://autopilot-panda.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_data": None,
                "error": None
            }

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    result["response_data"] = response.json()
                except:
                    result["response_data"] = response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    result["error"] = response.json()
                except:
                    result["error"] = response.text

            self.test_results.append(result)
            return success, response

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": None,
                "success": False,
                "response_data": None,
                "error": str(e)
            }
            self.test_results.append(result)
            return False, None

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "", 200)

    def test_waitlist_join_new_user(self):
        """Test joining waitlist with new user"""
        test_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": f"test{datetime.now().strftime('%H%M%S')}@example.com"
        }
        return self.run_test("Join Waitlist - New User", "POST", "waitlist", 200, test_data)

    def test_waitlist_join_duplicate_email(self):
        """Test joining waitlist with duplicate email"""
        # First, join with a user
        test_data = {
            "name": "Duplicate Test User",
            "email": "duplicate@example.com"
        }
        
        # First attempt should succeed
        success1, response1 = self.run_test("Join Waitlist - First Time", "POST", "waitlist", 200, test_data)
        
        if success1:
            # Second attempt should fail with 400
            success2, response2 = self.run_test("Join Waitlist - Duplicate Email", "POST", "waitlist", 400, test_data)
            return success2
        
        return False

    def test_waitlist_invalid_data(self):
        """Test waitlist with invalid data"""
        # Test empty name
        invalid_data1 = {"name": "", "email": "test@example.com"}
        success1, _ = self.run_test("Join Waitlist - Empty Name", "POST", "waitlist", 422, invalid_data1)
        
        # Test invalid email
        invalid_data2 = {"name": "Test User", "email": "invalid-email"}
        success2, _ = self.run_test("Join Waitlist - Invalid Email", "POST", "waitlist", 422, invalid_data2)
        
        return success1 and success2

    def test_waitlist_count(self):
        """Test getting waitlist count"""
        return self.run_test("Get Waitlist Count", "GET", "waitlist/count", 200)

    def test_status_endpoints(self):
        """Test status check endpoints"""
        # Test creating status check
        status_data = {"client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"}
        success1, _ = self.run_test("Create Status Check", "POST", "status", 200, status_data)
        
        # Test getting status checks
        success2, _ = self.run_test("Get Status Checks", "GET", "status", 200)
        
        return success1 and success2

def main():
    print("🐼 LazyGen Backend API Testing")
    print("=" * 50)
    
    tester = LazyGenAPITester()
    
    # Run all tests
    print("\n📡 Testing API connectivity...")
    tester.test_root_endpoint()
    
    print("\n📝 Testing waitlist functionality...")
    tester.test_waitlist_join_new_user()
    tester.test_waitlist_join_duplicate_email()
    tester.test_waitlist_invalid_data()
    tester.test_waitlist_count()
    
    print("\n🔍 Testing status endpoints...")
    tester.test_status_endpoints()
    
    # Print summary
    print(f"\n📊 Test Results Summary")
    print("=" * 30)
    print(f"Tests run: {tester.tests_run}")
    print(f"Tests passed: {tester.tests_passed}")
    print(f"Success rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    # Print failed tests
    failed_tests = [test for test in tester.test_results if not test["success"]]
    if failed_tests:
        print(f"\n❌ Failed Tests ({len(failed_tests)}):")
        for test in failed_tests:
            print(f"   - {test['test_name']}: {test.get('error', 'Status mismatch')}")
    
    # Save detailed results
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            "summary": {
                "tests_run": tester.tests_run,
                "tests_passed": tester.tests_passed,
                "success_rate": (tester.tests_passed/tester.tests_run)*100
            },
            "detailed_results": tester.test_results
        }, f, indent=2)
    
    print(f"\n💾 Detailed results saved to /app/backend_test_results.json")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())